import React, { Suspense, useState } from "react";
import { Canvas, useThree, useLoader } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  useGLTF,
  OrbitControls,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { CSG } from "three-csg-ts";
import { useGesture } from "react-use-gesture";
import { useControls } from "leva";
import { proxy, useSnapshot } from "valtio";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useSelector } from "react-redux";

const state = proxy({
  dragging: false,
});

const PanelRectangle = ({
  width,
  height,
  position,
  color = "white",
  woodWidth = 0.01,
  woodDepth = 0.005,
}) => {
  const material = new THREE.MeshStandardMaterial({ color: color });

  const tbGeometry = new THREE.BoxGeometry(width, woodWidth, woodDepth);
  const top = new THREE.Mesh(tbGeometry, material);
  const bottom = top.clone();
  bottom.rotateZ(Math.PI);

  const lrGeometry = new THREE.BoxGeometry(height, woodWidth, woodDepth);
  const left = new THREE.Mesh(lrGeometry, material);
  const right = left.clone();
  left.rotateZ(Math.PI / 2);
  right.rotateZ((Math.PI * 3) / 2);

  return (
    <group position={position}>
      <primitive
        object={top}
        position={[0, height / 2 - woodWidth / 2, woodDepth / 2]}
        name="panel"
      />
      <primitive
        object={bottom}
        position={[0, -(height / 2 - woodWidth / 2), woodDepth / 2]}
        name="panel"
      />
      <primitive
        object={left}
        position={[-(width / 2 - woodWidth / 2), 0, woodDepth / 2]}
        name="panel"
      />
      <primitive
        object={right}
        position={[width / 2 - woodWidth / 2, 0, woodDepth / 2]}
        name="panel"
      />
    </group>
  );
};

const Wall = ({
  children,
  color,
  width,
  height,
  depth = 0.002,
  holes = [],
  position,
  rotation,
  wallTexture,
}) => {
  const props = useTexture({
    map: "Stylized_Bricks_002/Stylized_Bricks_002_basecolor.jpg",
    normalMap: "Stylized_Bricks_002/Stylized_Bricks_002_normal.jpg",
    roughnessMap: "Stylized_Bricks_002/Stylized_Bricks_002_roughness.jpg",
    aoMap: "Stylized_Bricks_002/Stylized_Bricks_002_ambientocclusion.jpg",
  });
  props.map.wrapS = props.map.wrapT = THREE.RepeatWrapping;
  props.map.repeat.set(3, 3);
  props.normalMap.wrapS = props.normalMap.wrapT = THREE.RepeatWrapping;
  props.normalMap.repeat.set(3, 3);
  props.roughnessMap.wrapS = props.roughnessMap.wrapT = THREE.RepeatWrapping;
  props.roughnessMap.repeat.set(3, 3);
  props.aoMap.wrapS = props.aoMap.wrapT = THREE.RepeatWrapping;
  props.aoMap.repeat.set(3, 3);

  const prop = useTexture({
    map: "Pattern02_1K/Pattern02_1K_VarA.png",
  });
  prop.map.wrapS = prop.map.wrapT = THREE.RepeatWrapping;
  prop.map.repeat.set(5, 5);

  const material = wallTexture
    ? new THREE.MeshStandardMaterial({
        color: color,
        ...prop,
      })
    : new THREE.MeshStandardMaterial({
        color: color,
        ...props,
      });

  const geometry = new THREE.BoxGeometry(width, height, depth);
  let wall = new THREE.Mesh(geometry, material);

  holes.forEach(([x, y, z, w, h]) => {
    const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, depth * 10));
    mesh.position.add(new THREE.Vector3(x, y, z));
    mesh.updateMatrix();
    wall = CSG.subtract(wall, mesh);
  });

  return (
    <group position={position} rotation={rotation}>
      <primitive object={wall} position={[0, 0, 0]} name="wall" />
      {children}
    </group>
  );
};

const SkirtingBoard = ({ width, height, color, ...props }) => (
  <mesh name="skirting" position={[0, height / -2 + 0.05, 0.005]} {...props}>
    <boxGeometry args={[width, 0.1, 0.005]} />
    <meshStandardMaterial color={color} />
  </mesh>
);

const Window = ({ window, color, ...props }) => {
  const { nodes, materials } = useGLTF("windows.glb");
  console.log(window);
  return window ? (
    <group dispose={null} {...props}>
      <group
        position={[0, 0, -0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.4}
      >
        <group>
          <mesh
            geometry={nodes.casement_bridged_frame_frame1_0.geometry}
            material={nodes.casement_bridged_frame_frame1_0.material}
            material-color={color}
          />
        </group>
        <group rotation={[0, 0, 0]} position={[-0.96, 0, 0]} scale={1.08}>
          <mesh
            name="sliding_horizontal_windowR_frame2_0"
            geometry={nodes.sliding_horizontal_windowL_frame2_0.geometry}
            material={materials.frame2}
          />
          <mesh
            name="sliding_horizontal_windowR_glass_0"
            geometry={nodes.sliding_horizontal_windowL_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            name="sliding_horizontal_windowR_parts_0"
            geometry={nodes.sliding_horizontal_windowL_parts_0.geometry}
            material={materials.parts}
          />
        </group>
        <group rotation={[0, 0, 0]} position={[0.97, 0, 0]} scale={1.08}>
          <mesh
            name="sliding_horizontal_windowR_frame2_0"
            geometry={nodes.sliding_horizontal_windowR_frame2_0.geometry}
            material={materials.frame2}
          />
          <mesh
            name="sliding_horizontal_windowR_glass_0"
            geometry={nodes.sliding_horizontal_windowR_glass_0.geometry}
            material={materials.glass}
          />
          <mesh
            name="sliding_horizontal_windowR_parts_0"
            geometry={nodes.sliding_horizontal_windowR_parts_0.geometry}
            material={materials.parts}
          />
        </group>
      </group>
    </group>
  ) : (
    <group dispose={null} {...props}>
      <group
        position={[0, 0, -0.05]}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={0.4}
      >
        <group>
          <mesh
            geometry={nodes.casement_bridged_frame_frame1_0.geometry}
            material={nodes.casement_bridged_frame_frame1_0.material}
            material-color={color}
          />
        </group>
        <group rotation={[0, 0, 0]} position={[-1, 0, 0]}>
          <mesh
            geometry={nodes.casement_bridged_panelL_parts_0.geometry}
            material={nodes.casement_bridged_panelL_parts_0.material}
          />
          <mesh
            geometry={nodes.casement_bridged_panelL_frame2_0.geometry}
            material={materials.frame_2}
            material-color={color}
          />
          <mesh
            geometry={nodes.casement_bridged_panelL_glass_0.geometry}
            material={nodes.casement_bridged_panelL_glass_0.material}
          />
        </group>
        <group rotation={[0, 0, 0.2]} position={[1, 0, 0]}>
          <mesh
            geometry={nodes.casement_bridged_panelR_parts_0.geometry}
            material={nodes.casement_bridged_panelR_parts_0.material}
          />
          <mesh
            geometry={nodes.casement_bridged_panelR_frame2_0.geometry}
            material={materials.frame_2}
            material-color={color}
          />
          <mesh
            geometry={nodes.casement_bridged_panelR_glass_0.geometry}
            material={nodes.casement_bridged_panelR_glass_0.material}
          />
        </group>
      </group>
    </group>
  );
};

const WallSocket = (props) => {
  const { nodes } = useGLTF("socket.glb");
  return (
    <group dispose={null} {...props}>
      <group
        position={[0, 0, 0.005]}
        rotation={[0, Math.PI / -2, 0]}
        scale={0.9}
      >
        <group position={[0, 0.02, -0.01]} rotation={[0, 0, -0.22]}>
          <mesh
            geometry={nodes.Object_6.geometry}
            material={nodes.Object_6.material}
            name="socket"
          />
          <mesh
            geometry={nodes.Object_7.geometry}
            material={nodes.Object_7.material}
            name="socket"
          />
        </group>
        <group position={[0, 0.02, 0.01]} rotation={[0, 0, -0.22]}>
          <mesh
            geometry={nodes.Object_9.geometry}
            material={nodes.Object_9.material}
            name="socket"
          />
          <mesh
            geometry={nodes.Object_10.geometry}
            material={nodes.Object_10.material}
            name="socket"
          />
        </group>
        <mesh
          geometry={nodes.Object_4.geometry}
          material={nodes.Object_4.material}
          name="socket"
        />
      </group>
    </group>
  );
};

const LightSwitch = (props) => {
  const { nodes, materials } = useGLTF("switch.glb");
  return (
    <group dispose={null} {...props}>
      <group
        position={[-0.03, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        scale={0.02}
      >
        <group position={[1.67, 0.08, 8.33]} rotation={[-Math.PI / 2, 0, 0]}>
          <group position={[0, 0, -0.08]}>
            <mesh
              geometry={nodes.Box001__Default_0.geometry}
              material={materials.Default}
            />
          </group>
        </group>
        <group position={[0.4, 0, 8.33]} rotation={[-Math.PI / 2, 0, -2.99]}>
          <mesh
            geometry={nodes.Cylinder001_Default_2_0.geometry}
            material={materials.Default_2}
          />
        </group>
        <group position={[2.95, 0, 8.33]} rotation={[-Math.PI / 2, 0, -0.85]}>
          <mesh
            geometry={nodes.Cylinder002_Default_2_0.geometry}
            material={materials.Default_2}
          />
        </group>
        <group position={[1.69, 0.12, 8.32]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh
            geometry={nodes.Box003_Default_3_0.geometry}
            material={materials.Default_3}
          />
        </group>
      </group>
    </group>
  );
};

const Door = (props) => {
  const { nodes, materials } = useGLTF("models.glb");

  var materialName = props.material;
  // if (props.material != null) {
  //   const str = props.material;
  //   materialName = str.substring(13, str.length - 4);
  // }

  const material = materials[materialName];
  return (
    <mesh
      geometry={nodes.Pta_07_Blq018.geometry}
      material={material}
      scale={0.8}
      position={props.position}
      rotation={[0, Math.PI / 2, 0]}
    />
  );
};

const Plane = (props) => {
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={props.position}>
      <planeGeometry attach="geometry" args={[3, 6]} />
      <meshPhongMaterial
        attach="material"
        color={props.color}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

const PlaneWithTexture = (props) => {
  const textures = useTexture({
    map: `${props.texture}/${props.texture}_basecolor.png`,
    normalMap: `${props.texture}/${props.texture}_normal.png`,
    roughnessMap: `${props.texture}/${props.texture}_roughness.png`,
    aoMap: `${props.texture}/${props.texture}_ambientocclusion.png`,
  });
  textures.map.wrapS = textures.map.wrapT = THREE.RepeatWrapping;
  textures.map.repeat.set(3, 3);
  textures.normalMap.wrapS = textures.normalMap.wrapT = THREE.RepeatWrapping;
  textures.normalMap.repeat.set(3, 3);
  textures.roughnessMap.wrapS = textures.roughnessMap.wrapT =
    THREE.RepeatWrapping;
  textures.roughnessMap.repeat.set(3, 3);
  textures.aoMap.wrapS = textures.aoMap.wrapT = THREE.RepeatWrapping;
  textures.aoMap.repeat.set(3, 3);
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={props.position}>
      <planeGeometry attach="geometry" args={[3, 6]} />
      <meshStandardMaterial
        attach="material"
        color={props.color}
        side={THREE.DoubleSide}
        {...textures}
      />
    </mesh>
  );
};

const Draggable = ({ children, position: p = [0, 0, 0], ...props }) => {
  const [position, setPosition] = useState(p);
  const { size, viewport } = useThree();
  const aspect = size.width / viewport.width; // TODO: Calc aspect properly (e.g. with zoom)
  const bind = useGesture({
    onDrag: ({ offset: [x, y] }) => {
      const [, , z] = position;
      setPosition([x / aspect, -y / aspect, z]);
    },
    onDragStart: () => (state.dragging = true),
    onDragEnd: () => (state.dragging = false),
  });
  return (
    <group position={position} {...bind()} dispose={null} {...props}>
      {children}
    </group>
  );
};

const Three = () => {
  const snap = useSnapshot(state);
  const product = useSelector((state) => state.product);
  const isDoor = product.product.categories[0] == "door";
  const isWindow = product.product.categories[0] == "window";
  const isWall = product.product.categories[0] == "wall";
  const isFloor = product.product.categories[0] == "floor";
  const material = product.product.model;

  const {
    width: wallWidth,
    height: wallHeight,
    colour: wallColor,
  } = useControls("Wall", {
    width: { value: 3, min: 1, max: 10, step: 1 },
    height: { value: 2, min: 1, max: 10, step: 1 },
    colour: "#75583a",
  });

  // const {
  //   columns: panelColumnCount,
  //   gap: columnGap,
  //   width: panelWoodWidth,
  //   depth: panelWoodDepth,
  //   colour: panelColor,
  // } = useControls("Panels", {
  //   columns: { value: 4, min: 1, max: 10, step: 1 },
  //   gap: { value: 0.1, min: 0, max: 1, step: 0.1 },
  //   width: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
  //   depth: { value: 0.01, min: 0, max: 0.1, step: 0.01 },
  //   colour: "#fff",
  // });

  // const panelOffset = wallHeight * -0.15;
  // const panelHeight = wallHeight / 6;
  // const columnWidth =
  //   (wallWidth - columnGap * (panelColumnCount + 1)) / panelColumnCount;

  // const panelRectangles = [];
  // for (let i = 0; i < panelColumnCount; i++) {
  //   const x =
  //     i * (columnWidth + columnGap) -
  //     (wallWidth / 2 - columnWidth / 2 - columnGap);
  //   panelRectangles.push(
  //     {
  //       width: columnWidth,
  //       height: panelHeight * 3,
  //       position: [x, panelOffset + panelHeight * 2, 0],
  //     },
  //     {
  //       width: columnWidth,
  //       height: panelHeight * 0.5,
  //       position: [x, panelOffset, 0],
  //     },
  //     {
  //       width: columnWidth,
  //       height: panelHeight * 1.2,
  //       position: [x, panelOffset - panelHeight, 0],
  //     }
  //   );
  // }

  const {
    "skirting board": showSkirting,
    "light switch": lightSwitchCount,
    "plug socket": socketCount,
  } = useControls("Features", {
    "light switch": { value: 0, min: 0, max: 1, step: 1 },
    "plug socket": { value: 0, min: 0, max: 1, step: 1 },
    "skirting board": true,
  });

  const {
    showWindow: showWindow,
    position: windowPosition,
    colour: windowColor,
  } = useControls("Window", {
    showWindow: true,
    colour: "#fff",
    position: [0, 0.35, 0],
  });
  const windowHoles = showWindow
    ? [[windowPosition[0], windowPosition[1], 0, 0.8, 1]]
    : [];

  const { position: doorPosition } = useControls("Door", {
    position: [1.52, -1, 2.5],
  });

  return (
    <div style={{ position: "relative", width: "100%", height: 1000 }}>
      <Canvas
        color="#2d3436"
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 0, 4], fov: 50 }}
      >
        <ambientLight intensity={0.7} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, 10]}
          castShadow
        />
        <Suspense fallback={null}>
          <Door
            position={doorPosition}
            material={isDoor ? material : "M_Chocolate"}
          />
          <Plane position={[0, -1, 0]} color="white" />
          <PlaneWithTexture
            position={[0, -0.99, 0]}
            texture={isFloor ? material : "Parquet"}
          />
          {/* first wall */}
          <Wall
            width={wallWidth}
            height={wallHeight}
            color={wallColor}
            holes={windowHoles}
            position={[0, 0, 3]}
            rotation={[0, 0, 0]}
            wallTexture={isWall}
          >
            {showSkirting && (
              <SkirtingBoard
                width={wallWidth}
                height={wallHeight}
                colour="red"
              />
            )}
            {showWindow && (
              <Window
                position={windowPosition}
                color={windowColor}
                window={isWindow ? true : false}
              />
            )}
          </Wall>

          {/* second wall */}
          <Wall
            wallTexture={isWall}
            width={wallWidth * 2}
            height={wallHeight}
            color={wallColor}
            position={[1.5, 0, 0]}
            rotation={[0, Math.PI / 2, 0]}
          >
            {showSkirting && (
              <SkirtingBoard
                width={wallWidth * 2}
                height={wallHeight}
                colour="white"
              />
            )}
            {[...Array(socketCount)].map((_, i) => (
              <Draggable key={i}>
                <WallSocket />
              </Draggable>
            ))}
            {[...Array(lightSwitchCount)].map((_, i) => (
              <Draggable key={i}>
                <LightSwitch />
              </Draggable>
            ))}
          </Wall>

          {/* third wall */}
          <Wall
            wallTexture={isWall}
            width={wallWidth}
            height={wallHeight}
            color={wallColor}
            holes={windowHoles}
            position={[0, 0, -3]}
            rotation={[0, Math.PI, 0]}
          >
            {showSkirting && (
              <SkirtingBoard
                width={wallWidth}
                height={wallHeight}
                colour="white"
              />
            )}
            {showWindow && (
              <Window
                position={windowPosition}
                color={windowColor}
                window={isWindow ? true : false}
              />
            )}
          </Wall>

          {/* fourth wall */}
          <Wall
            wallTexture={isWall}
            width={wallWidth * 2}
            height={wallHeight}
            color={wallColor}
            holes={windowHoles}
            position={[-1.5, 0, 0]}
            rotation={[0, -Math.PI / 2, 0]}
          >
            {showSkirting && (
              <SkirtingBoard
                width={wallWidth * 2}
                height={wallHeight}
                colour="white"
              />
            )}
            {showWindow && (
              <Window position={windowPosition} color={windowColor} />
            )}

            {/* {panelRectangles.map((r, i) => (
              <PanelRectangle
                key={i}
                width={wallWidth * 2}
                woodWidth={panelWoodWidth * 2}
                woodDepth={panelWoodDepth}
                color={panelColor}
                {...r}
              />
            ))} */}
          </Wall>
        </Suspense>
        <Suspense fallback={null}>
          <Environment preset="apartment" />
          <ContactShadows
            rotation-x={Math.PI / 2}
            position={[0, -0.8, 0]}
            opacity={0.25}
            width={10}
            height={10}
            blur={1.5}
            far={0.8}
          />
          <OrbitControls enabled={!snap.dragging} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Three;
