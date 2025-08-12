"use client";
import React, { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import ProjectDetail from '@/component/ProjectDetail';
import { useSearchParams } from 'next/navigation';

export default function ProjectClient(){
  const sp = useSearchParams();
  const id = sp.get('id');

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(()=>{
    if(!id) return;
    const supabase = createClient();

    (async ()=>{
      const {data:result,error} = await supabase
      .from("portfolio")
      .select()
      .eq('id', id)
      .single();
      if(error){
        console.log(error);
        return null;
      }
      setData(result);
    })()

  },[id]);

  /*
  async function getData(id){

  }
  */
  /*
  export async function GenerateMetadata({params}){  
    const { id } = await params
    const data = await getData(id);
  
    return {
      title:`${data?.title || 'Project'}- Minimal Portfolio`,
      description:  "welcome to my portfolio"
    }
  }
  */
 console.log(data);
  return(
    <>
      {!data ? 
        (<p>데이터 로딩중</p>)
        :
        (
      <ProjectDetail data={data}/>
      )}
    </>
  )
}
