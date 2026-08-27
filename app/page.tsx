
import ContactCard from "@/components/contactcard";
import PostCards from "@/components/postcard";
import TopMainPage from "@/components/topmainpage";
import QuoteCard from "@/components/quotecard";
import FooterCard from "@/components/footer";

export default function Home() {  

  return (
    <div className="space-y-12 ">

      {/* top page content */}
      <TopMainPage/>

      {/* quotecard */}
      <QuoteCard/>

      {/* post part */}
      <PostCards/>

     {/* contact card */}
      <ContactCard />

      <FooterCard/>
    </div>
  );
}


 
