const menus = ["분식", "피자", "비빔밥", "도시락"];
const segmentAngle = 360 / menus.length;
const wheel = document.querySelector(".wheel");
const startButton = document.getElementById("start-button");
const result = document.getElementById("result");

let currentRotation = 0;
let isSpinning = false;

const formatResult = (menu) => `${menu} 당첨!`;

const normalizeAngle = (angle) => {
  const normalized = angle % 360;
  return normalized < 0 ? normalized + 360 : normalized;
};

startButton.addEventListener("click", () => {
  if (isSpinning) {
    return;
  }

  isSpinning = true;
  startButton.disabled = true;
  result.textContent = "돌리는 중...";

  const normCurrent = normalizeAngle(currentRotation);
  const selectedIndex = Math.floor(Math.random() * menus.length);
  const targetNormalized = selectedIndex * segmentAngle;
  const extraSpins = Math.floor(Math.random() * 3) + 4; // 4 ~ 6바퀴
  const delta = (targetNormalized - normCurrent + 360) % 360;

  currentRotation += extraSpins * 360 + delta;
  wheel.style.transform = `rotate(${currentRotation}deg)`;

  const handleTransitionEnd = () => {
    wheel.removeEventListener("transitionend", handleTransitionEnd);

    const finalNormalized = normalizeAngle(currentRotation);
    const finalIndex =
      Math.floor((finalNormalized + segmentAngle / 2) / segmentAngle) % menus.length;
    result.textContent = formatResult(menus[finalIndex]);

    isSpinning = false;
    startButton.disabled = false;
  };

  wheel.addEventListener("transitionend", handleTransitionEnd);
});

// 초기 안내 문구
result.textContent = "어떤 메뉴가 나올까요?";
