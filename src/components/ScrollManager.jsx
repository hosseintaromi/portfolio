import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useRef } from "react";

export const ScrollManager = ({ section, onSectionChange }) => {
  // const { section, onSectionChange } = props;

  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        console.log("start");
        isAnimating.current = true;
      },
      onComplete: () => {
        setTimeout(() => {
          isAnimating.current = false;
        }, 600);
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }
    // console.log(data.scroll.current);
    const curSection = Math.floor(data.scroll.current * data.pages);
    if (data.scroll.current > lastScroll.current && curSection === 0) {
      onSectionChange(1);
    }
    if (data.scroll.current > lastScroll.current && curSection === 1) {
      onSectionChange(2);
    }
    if (data.scroll.current > lastScroll.current && curSection === 2) {
      onSectionChange(3);
    }
    if (data.scroll.current > lastScroll.current && curSection === 3) {
      onSectionChange(4);
    }

    if (data.scroll.current < lastScroll.current && curSection === 1) {
      onSectionChange(0);
    }
    if (data.scroll.current < lastScroll.current && curSection === 2) {
      onSectionChange(1);
    }
    if (data.scroll.current < lastScroll.current && curSection === 3) {
      onSectionChange(2);
    }
    if (data.scroll.current < lastScroll.current && curSection === 4) {
      onSectionChange(3);
    }

    lastScroll.current = data.scroll.current;
  });

  return null;
};
