"use client";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation'

export default function LoginStatus(){
  const supabase = createClient();
  const router = useRouter();
  const [user, setUser] = useState(null); //로그인한 유저 정보 할당

  useEffect(()=>{
    (async ()=>{
      const { data: { user } } = await supabase.auth.getUser(); 
      setUser(user);
     })();
  },[]);

  const handleLogout = async ()=>{
    await supabase.auth.signOut();
    setUser(null);
    router.push('/');
    router.refresh();
  }

  if(user){
    return(
      <li><button className="btn btn-primary" onClick={handleLogout}>Logout</button></li>
    )
  } else{
    return null;
  }
}