import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
 
const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;
const ROTATION = 1; //trial

//function to animate the fade of the models
const fadeMeshes = (group, opacity) => {
    if(!group) return;

    group.traverse((child) =>{
        if(child.isMesh) {
            child.material.transparent = true;
            gsap.to(child.material, {opacity, duration: ANIMATION_DURATION})
        }
    } )
}

//function to animate the movement of the models?
const moveGroup = (group, x) => {
    if(!group) return;

    gsap.to(group.position, {x, duration: ANIMATION_DURATION})
}

//trial function to rotate when coming in group
const rotateGroup = (group, y) => {
    if(!group) return;

    gsap.to(group.rotation, {y, duration: ANIMATION_DURATION})
} 
 
const ModelSwitcher = ({ scale, isMobile }) => {

    const smallMacbookRef = useRef();
    const largeMacbookRef = useRef();

    const showLargeMacbook = scale === 0.08 || scale === 0.05;

    //the actual movement now, that uses the animations above of fade and move to apply to the groups now
    useGSAP(() => {

        if(showLargeMacbook) {
            rotateGroup(smallMacbookRef.current, -ROTATION);
            rotateGroup(largeMacbookRef.current, 0);
            
            moveGroup(smallMacbookRef.current, -OFFSET_DISTANCE);
            moveGroup(largeMacbookRef.current, 0);
    
            fadeMeshes(smallMacbookRef.current, 0);
            fadeMeshes(largeMacbookRef.current, 1);
        } else {
            rotateGroup(smallMacbookRef.current, 0);
            rotateGroup(largeMacbookRef.current, ROTATION);

            moveGroup(smallMacbookRef.current, 0);
            moveGroup(largeMacbookRef.current, OFFSET_DISTANCE);
    
            fadeMeshes(smallMacbookRef.current, 1);
            fadeMeshes(largeMacbookRef.current, 0);
        }

    }, [scale])

    
    //properties applied to hte group, i.e the control configuration of the entire group that holds the models
    const controlsConfig = {
        snap: true, 
        speed: 1,
        zoom: 0.8,
       // polar: [-Math.PI, Math.PI], //look down
        azimuth: [-Infinity, Infinity],
        config: {mass:2, tension: 1, friction:  -1}

    }

    return (
        <>
            <PresentationControls {...controlsConfig}>
                <group ref={largeMacbookRef}>
                   <MacbookModel16 scale={isMobile ? 0.05 : 0.08} position={[0, 0, 0]}/> 
                </group>
                
            </PresentationControls>

            <PresentationControls {...controlsConfig}>
                <group ref={smallMacbookRef}>
                    <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
                </group>
            </PresentationControls>
        </>
    );
}

export default ModelSwitcher;