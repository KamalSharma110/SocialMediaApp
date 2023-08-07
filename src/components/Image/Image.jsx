import { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";

import "./Image.css";
import Backdrop from "../Backdrop/Backdrop";

let prevElement;
const Image = (props) => {
  const [isOpened, setOpened] = useState(false);
  const nodeRef = useRef();
  const ref = useRef();

  useEffect(() => {
    const refRect = ref.current.getBoundingClientRect();

    const centerFromTop = refRect.top + refRect.height / 2;
    const centerFromLeft = refRect.left + refRect.width / 2;

    if (isOpened) {
      let element = ref.current;
      while (element.parentElement.parentElement.id !== "root")
        element = element.parentElement;
      prevElement = element;
      element.style.zIndex = 2;

      const verticalCenter = nodeRef.current.offsetHeight / 2;
      const horizontalCenter = nodeRef.current.offsetWidth / 2;

      nodeRef.current.style.setProperty(
        "--initial-top",
        centerFromTop - verticalCenter + "px"
      );
      nodeRef.current.style.setProperty(
        "--initial-left",
        centerFromLeft - horizontalCenter + "px"
      );
      nodeRef.current.style.setProperty(
        "--initial-right",
        centerFromLeft + horizontalCenter + "px"
      );
      nodeRef.current.style.setProperty(
        "--initial-bottom",
        centerFromTop + verticalCenter + "px"
      );
    }
  }, [nodeRef, ref, isOpened]);

  const onEnter = () => {
    const element = nodeRef.current;
    const verticalCenter = element.offsetHeight / 2;
    const horizontalCenter = element.offsetWidth / 2;
    const screenVerticalCenter = window.innerHeight / 2;
    const screenHorizontalCenter = document.getElementsByTagName('body')[0].clientWidth / 2;

    element.style.setProperty(
      "--final-top",
      screenVerticalCenter - verticalCenter + "px"
    );
    element.style.setProperty(
      "--final-left",
      screenHorizontalCenter - horizontalCenter + "px"
    );
    element.style.setProperty(
      "--final-right",
      screenHorizontalCenter + horizontalCenter + "px"
    );
    element.style.setProperty(
      "--final-bottom",
      screenVerticalCenter + verticalCenter + "px"
    );
  };

  return (
    <>
      <img
        src={props.src}
        alt="img"
        onClick={() => setOpened(true)}
        ref={ref}
        className={props.className || ""}
      />
      <CSSTransition
        nodeRef={nodeRef}
        in={isOpened}
        timeout={600}
        classNames="image"
        mountOnEnter
        unmountOnExit
        onEnter={onEnter}
        onExited={() => (prevElement.style.zIndex = 0)}
      >
        <>
          <Backdrop showContent={setOpened} />
          <img
            id="image"
            src={props.src}
            alt="img"
            ref={nodeRef}
            onClick={() => setOpened(false)}
          />
        </>
      </CSSTransition>
    </>
  );
};

export default Image;
