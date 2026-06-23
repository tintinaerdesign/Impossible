import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import Ships from "../../assets/Ships.png";

export default function Next2() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  const overlayOpacity = useTransform(scrollYProgress, [0, 1], [0.4, 0.8]);

  const text1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);

  const text2 = useTransform(scrollYProgress, [0.25, 0.4, 0.5], [0, 1, 0]);

  const text3 = useTransform(scrollYProgress, [0.5, 0.7, 0.8], [0, 1, 0]);

  const text4 = useTransform(scrollYProgress, [0.8, 0.95], [0, 1]);

  return (
    <section ref={sectionRef} className="relative h-[400vh] bg-black">
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Image */}

        <motion.img
          src={Ships}
          alt=""
          style={{
            scale: imageScale,
          }}
          className="
            absolute
            inset-0
            w-full
            h-full
            object-cover
          "
        />

        {/* Dark Overlay */}

        <motion.div
          style={{
            opacity: overlayOpacity,
          }}
          className="
            absolute
            inset-0
            bg-black
          "
        />

        {/* Vignette */}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/50
            via-transparent
            to-black/80
          "
        />

        {/* Chapter Label */}

        <div
          className="
            absolute
            top-20
            left-1/2
            -translate-x-1/2
            text-center
          "
        >
          <p
            className="
              text-pink-500
              uppercase
              tracking-[0.5em]
              text-sm
            "
          >
            Chapter 2 · Section 3
          </p>
        </div>

        {/* Scene 1 */}

        <motion.div
          style={{ opacity: text1 }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-center
            px-8
          "
        >
          <div>
            <h2
              className="
                text-5xl
                md:text-7xl
                font-serif
              "
            >
              For Generations
            </h2>

            <p
              className="
                mt-8
                text-xl
                text-zinc-300
              "
            >
              The beads remained scarce.
            </p>
          </div>
        </motion.div>

        {/* Scene 2 */}

        <motion.div
          style={{ opacity: text2 }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-center
            px-8
          "
        >
          <div>
            <h2
              className="
                text-6xl
                md:text-8xl
                font-serif
              "
            >
              Until One Day...
            </h2>
          </div>
        </motion.div>

        {/* Scene 3 */}

        <motion.div
          style={{ opacity: text3 }}
          className="
            
            flex
            items-center
            justify-center
            text-center
            px-8
          "
        >
          <div>
            <h2
              className="
                text-5xl
                md:text-7xl
                font-serif mt-80
              "
            >
              Ships Appeared
            </h2>

            <p
              className="
                mt-8
                text-xl
                text-zinc-300
              "
            >
              On the horizon.
            </p>
          </div>
        </motion.div>

        {/* Scene 4 */}

        <motion.div
          style={{ opacity: text4 }}
          className="
            absolute
            inset-0
            flex
            items-center
            justify-center
            text-center
            px-8
          "
        >
          <div>
            <h2
              className="
                text-6xl
                md:text-9xl
                font-black
                text-orange-400
                tracking-wide
              "
            >
              MORE
              <br />
              BEADS
            </h2>

            <p
              className="
                mt-8
                text-xl
                md:text-2xl
                text-zinc-300
              "
            >
              Bringing trade.
              <br />
              Bringing opportunity.
              <br />
              Bringing abundance.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
