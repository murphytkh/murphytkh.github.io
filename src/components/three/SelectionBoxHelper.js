import {useEffect, useRef} from "react";
import {useThree} from "@react-three/fiber";
import {SelectionBox} from "three/examples/jsm/interactive/SelectionBox";

function SelectionBoxHelper(props)
{
    // selection box
    const {mouse, camera, scene, gl} = useThree();
    let selecting = useRef(false);
    let selectionBox = new SelectionBox(camera, scene);

    let pointerDown = (event) =>
    {
        if (!selecting.current)
        {
            let {ctrlKey} = event;
            if (ctrlKey)
            {
                selecting.current = true;
                props.isSelecting(true);
                selectionBox.startPoint.set(mouse.x, mouse.y, 0.5);
                selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            }
        }
    }

    let pointerMove = (event) =>
    {
        if (selecting.current)
        {
            selectionBox.select();
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curr = selectionBox.select();
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setHighlight(curr);
        }
    }

    let pointerUp = (event) =>
    {
        if (selecting.current || !event.button)
        {
            selecting.current = false;
            selectionBox.endPoint.set(mouse.x, mouse.y, 0.5);
            let curr = selectionBox.select();
            curr = curr.filter((obj) => obj.userData.hasOwnProperty("selected"));
            props.setSelection(curr);
        }
    }

    useEffect(() =>{
        gl.domElement.onpointermove = pointerMove;
        gl.domElement.onpointerup = pointerUp;
        gl.domElement.onpointerdown = pointerDown;
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return null;
}

export default SelectionBoxHelper;