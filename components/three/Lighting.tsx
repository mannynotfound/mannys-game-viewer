function Lighting() {
  return (
    <>
      <hemisphereLight args={[0xffffff, 0x444444]} position={[0, 0, 0]} />
      <directionalLight
        color={0xffffff}
        intensity={0.25}
        castShadow
        position={[0, 200, 100]}
      />
    </>
  );
}

export default Lighting;
