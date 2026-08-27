"use client"

import Link from "next/link";
import { useQuery } from "@tanstack/react-query"
import PostCards from "@/components/postcard";



export default function Home() {

  return (

    <PostCards/>

  );
}
