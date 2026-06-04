import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export default function ScrollReveal({ children, direction = 'up', delay = 0 }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.15,
  });

  const getVariants = () => {
    let x = 0;
    let y = 0;

    switch (direction) {
      case 'up':
        y = 40;
        break;
      case 'down':
        y = -40;
        break;
      case 'left':
        x = -40;
        break;
      case 'right':
        x = 40;
        break;
      default:
        y = 40;
    }

    return {
      hidden: { opacity: 0, x, y },
      visible: { opacity: 1, x: 0, y: 0 },
    };
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={getVariants()}
      transition={{
        duration: 0.7,
        ease: 'easeOut',
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
}
