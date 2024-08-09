document.addEventListener("DOMContentLoaded", () => {
  let boxes = document.querySelectorAll(".boxes");
  let resetBtn = document.querySelector("#resetBtn");
  let newBtn = document.querySelector("#new-btn");
  let msgContainer = document.querySelector(".msg-container");
  let msg = document.querySelector("#msg");

  let turn_O = true;
  let gameActive = true;

  const winPattern = [
      [0, 1, 2],
      [0, 3, 6],
      [0, 4, 8],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [3, 4, 5],
      [6, 7, 8]
  ];

  const resetGame = () => {
      turn_O = true;
      gameActive = true;
      enableBoxes();
      msg.innerText = ""; 
      msgContainer.classList.add("hide"); 
  };

  const disableBoxes = () => {
      boxes.forEach(box => box.classList.add("disabled"));
  };

  const enableBoxes = () => {
      boxes.forEach(box => {
          box.classList.remove("disabled");
          box.innerText = ""; 
      });
  };

  const showWinner = (winner) => {
      msg.innerText = `Congratulations, the winner is ${winner}`;
      msgContainer.classList.remove("hide");
      disableBoxes();
      gameActive = false; 
  };

  const checkWinner = () => {
      for (let pattern of winPattern) {
          let pos1Val = boxes[pattern[0]].innerText;
          let pos2Val = boxes[pattern[1]].innerText;
          let pos3Val = boxes[pattern[2]].innerText;
          if (pos1Val !== "" && pos1Val === pos2Val && pos2Val === pos3Val) {
              showWinner(pos1Val);
              return;
          }
      }
  };

  boxes.forEach(box => {
      box.addEventListener("click", () => {
          if (gameActive && box.innerText === "") {
              box.innerText = turn_O ? "O" : "X";
              turn_O = !turn_O; 
              checkWinner();
          }
      });
  });

  newBtn.addEventListener("click", resetGame);
  resetBtn.addEventListener("click", resetGame);

});
