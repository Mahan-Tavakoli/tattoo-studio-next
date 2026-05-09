"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { useRef, useState } from "react";
import useReview from "./useReview";
import Image from "next/image";
import RatingStars from "@/components/templates/review/RatingStars";
import { Star } from "lucide-react";
import ReviewSkeleton from "@/components/templates/skeleton/skeletons/home/ReviewSkeleton";
import { toast } from "react-toastify";

function Review() {
  const { reviews, reviewsIsLoading, reviewsIsError } = useReview();
  const [hovered, setHovered] = useState<number>(0);
  const reviewSwiperRef = useRef<any>(null);

  console.log("reviews =>", reviews);

  const enableSliderFeatures = reviews?.length >= 4;

  const skeletonSlides = [...Array(3)];

  return (
    <section className="mt-10 border border-snow/20 rounded-xl shadow shadow-alabaster/20 bg-onyx">
      <div className="flex flex-col lg:flex-row gap-6 py-5 lg:py-10 px-4">
        <div className="w-full lg:w-[20%] flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-base font-medium">Share your experience</p>

          <button
            onClick={() => window.open("YOUR_GOOGLE_REVIEW_LINK", "_blank")}
            className="flex flex-col items-center gap-2 group"
          >
            {/* Interactive stars */}
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={22}
                  onMouseEnter={() => setHovered(star)}
                  onMouseLeave={() => setHovered(0)}
                  className={
                    star <= hovered
                      ? "fill-yellow-400 text-yellow-400 cursor-pointer transition-all duration-300"
                      : "text-snow/50 cursor-pointer"
                  }
                />
              ))}
            </div>

            <span className="text-sm text-snow/70 group-hover:text-snow group-hover:border-snow/75 transition-colors duration-300 border border-snow/40 px-3 py-2 rounded-lg">
              Rate us on Google
            </span>
          </button>
        </div>
        {/* Swiper comments */}
        <Swiper
          modules={[Autoplay]}
          onSwiper={(swiper) => (reviewSwiperRef.current = swiper)}
          autoplay={
            enableSliderFeatures && !reviewsIsLoading
              ? {
                  delay: 3000,
                  disableOnInteraction: false,
                  //pauseOnMouseEnter: true,
                }
              : false
          }
          //spaceBetween={25}
          loop={enableSliderFeatures && !reviewsIsLoading}
          loopAdditionalSlides={reviews?.length || 0}
          className="w-full lg:w-[80%]"
          breakpoints={{
            0: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
          }}
        >
          {reviewsIsLoading ? (
            skeletonSlides.map((_, index) => (
              <SwiperSlide key={`skeleton-${index}`}>
                <ReviewSkeleton />
              </SwiperSlide>
            ))
          ) : reviewsIsError ? (
            <div className="">Failed To fetch reviews</div>
          ) : (
            reviews?.map((review, index) => (
              <SwiperSlide key={index}>
                <div className="bg-onyx rounded-2xl border text-sm border-snow/20 flex flex-col mx-2 h-full shadow shadow-alabaster/20">
                  {/* Header */}
                  <div className="px-4 py-2 flex items-center justify-between border-b border-snow/20">
                    <div className="flex items-center gap-x-2">
                      <Image
                        src={review?.authorPhotoUrl}
                        alt={review?.authorName}
                        width={35}
                        height={35}
                        className="object-cover rounded-full"
                      />
                      <span className="font-bold text-xs sm:text-sm">
                        {review?.authorName}
                      </span>
                    </div>

                    <span className="text-[10px] sm:text-xs">
                      {review?.relativeTimeDescription}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="px-4 py-3 flex flex-col flex-1">
                    <RatingStars rating={review?.rating} />

                    <div className="mt-3 text-xs sm:text-sm overflow-y-auto max-h-28">
                      {review.text}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))
          )}
        </Swiper>
      </div>
    </section>
  );
}

export default Review;
