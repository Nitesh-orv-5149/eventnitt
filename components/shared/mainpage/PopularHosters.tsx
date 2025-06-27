"use client"

import AvatarCircle from "@/components/ui/AvatarCircle";
import Carousel from "@/components/ui/Carousal";
import ThirdTitle from "@/components/ui/ThirdTItle";
import { IAvatar } from "@/types/CardTypes";
import axios from "axios";
import { useEffect, useState } from "react";

export default function PopularHosters() {

  const [allHosters, setAllHosters] = useState<IAvatar[]>([])

  async function fetchPopularHosters() {
    try {
      const response = await axios.get("/api/hoster/all");
      console.log("Hosters:", response.data.hosters);
      setAllHosters(response.data.hosters)
    } catch (err) {
      console.error("Failed to fetch hosters:", err);
    }      
  }

  useEffect(() => {
    fetchPopularHosters()
  }, [])

    return (
        <section className="pb-12">
          <div className="container mx-auto px-6">
            <div className="mb-8">
              <ThirdTitle color="text-light" title="popular hosters" />
            </div>
            
            {/* Popular Posters Carousel */}
            <Carousel showArrows={true} spacing="lg" className="mb-4">
              {allHosters.map((hoster, index) => (
                <AvatarCircle 
                  key={index}
                  name={hoster.organisation}
                />
              ))}
            </Carousel>
          </div>
        </section>
    );
}