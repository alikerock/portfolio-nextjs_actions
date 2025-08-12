"use client";
import Image from "next/image";
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from "react";

export default function ProjectDetail({data}){
  console.log(data);

  const [urls, setUrls] = useState({rep1:'', rep2:''});

  useEffect(()=>{

    if(!data?.rep1_img && !data?.rep2_img) return;
    const supabase = createClient();

    const getUrl = (path)=> 
      supabase.storage.from('portfolio').getPublicUrl(path).data?.publicUrl || '';
  
    setUrls({
      rep1:getUrl(data.rep1_img), 
      rep2:getUrl(data.rep2_img)
    });

  },[data?.rep1_img, data?.rep2_img]);

  return(
    <div className="container">
      <div className="row">
        <div className="col-md-8 decription">
          <div className="contents shadow">    
            {
              urls.rep1 && (
                <>
                  <Image className="img-fluid" src={urls.rep1} width={762} height={504} alt={data.title} />
                  <p>{data.rep1_desc}</p>
                </>
              )
            }       
          </div>
          <div className="contents shadow">
          {
              urls.rep2 && (
                <>
                  <Image className="img-fluid" src={urls.rep2} width={762} height={504} alt={data.title} />
                  <p>{data.rep2_desc}</p>
                </>
              )
            } 
          </div>
        </div>
        <div className="col-md-4 portfolio_info">
          <div className="contents shadow">
            <h2>{data.title}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. </p>
            <p className="link">
              <a href="">Visit site &rarr;</a>
            </p>
            <hr className="double"/>
            <blockquote>
              <p>“Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore
                et dolore magna aliqua.” </p>
              <small>- JOHN DOE, ACME INC. -</small>
            </blockquote>
            <p className="nav">
              <a href="" className="secondary-btn">&larr; Previous Project</a>
              <a href="" className="secondary-btn">Next Project &rarr;</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}