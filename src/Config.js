import LoadingScene from "./scenes/LoadingScene";
import PlayingScene from "./scenes/PlayingScene";

const Config = {
    
  // 게임 화면의 크기와 색을 설정하는 부분입니다.
  width: 800,
  height: 600,
  backgroundColor: 0x000000,

  // 사용할 scene은 config의 scene 프로퍼티의 배열에 추가해줘야 합니다.
  scene: [LoadingScene, PlayingScene],

  // pixelArt를 사용할 경우 pixelArt: true로 설정해야 선명하게 보입니다.
  pixelArt: true,

  /*
  물리엔진은 arcade, matter 등이 있는데 가벼운 arcade를 사용할 것입니다.
  env 파일에 DEBUG=true로 설정되어 있으면 디버그 모드로 실행됩니다.
  디버그 모드에서는 게임 오브젝트들이 차지하는 면적이 분홍색 경계선으로 표시되고,
  움직이는 오브젝트의 경우 방향도 표시되어 더 편하게 개발할 수 있습니다.
  */
  physics: {
    default: "arcade",
    arcade: {
      debug: process.env.DEBUG === "true",
    },
  },
};

export default Config;