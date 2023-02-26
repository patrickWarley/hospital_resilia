import { motion } from "framer-motion";

function ScrollDown({ nextSection }) {
  const item = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1,
      scale: [1, 1.5],
      transition: {
        repeat: Infinity,
        duration: 2
      }
    }
  }
  return (
    <div className="d-flex flex-column align-items-center">
      <a href={nextSection} className="text-decoration-none" style={{ color: 'black' }}>Ver mais</a>
      <motion.i class="m-0 p-0 fa-solid fa-angle-down" variants={item} animate="visible" />
    </div>

  );
}

export default ScrollDown;