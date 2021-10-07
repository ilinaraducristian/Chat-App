import {useCallback, useEffect, useState} from "react";
import {useDrop} from "react-dnd";
import {ChannelDragObject, ItemTypes} from "types/DnDItemTypes";
import DropHandleComponent from "components/DropHandle/DropHandle.component";

type ComponentProps = {
  index: number
}

function GroupDropHandleComponent({index}: ComponentProps) {

  console.log(index);

  const [hidden, setHidden] = useState(true);

  const handleDrop = useCallback(() => {
  }, []);

  const handleHover = useCallback(() => {
    setHidden(false);
  }, []);

  const handleCollect = useCallback((monitor) => {
    return {
      isOver: monitor.isOver()
    };
  }, []);

  const [props, drop] = useDrop<ChannelDragObject, any, any>({
    accept: ItemTypes.GROUP,
    drop: handleDrop,
    hover: handleHover,
    collect: handleCollect
  }, [handleDrop, handleHover, handleCollect]);

  useEffect(() => {
    setHidden(!props.isOver);
  }, [props]);

  return <DropHandleComponent hidden={hidden} ref={drop}/>;

}

export default GroupDropHandleComponent;