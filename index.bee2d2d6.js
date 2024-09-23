class t{static gameStatuses={idle:"idle",playing:"playing",win:"win",lose:"lose"};constructor(e=this.generateDefaultState()){this.initialState=e,this.state=e.map(t=>[...t]),this.status=t.gameStatuses.idle,this.score=0}generateDefaultState(){return Array.from({length:4},()=>[,,,,].fill(0))}moveLeft(){if(!this.isStateValid(this.state))return;let t=this.state.map(t=>this.applyMove(t));this.updateGameState(t),this.completeMoveTasks()}moveRight(){let t=this.state.map(t=>[...t].reverse());if(!this.isStateValid(t))return;let e=t.map(t=>this.applyMove(t).reverse());this.isStateDifferent(this.state,e)&&(this.updateGameState(e),this.completeMoveTasks())}isStateDifferent(t,e){return JSON.stringify(t)!==JSON.stringify(e)}moveUp(){let t=this.rotateRight(this.state);if(!this.isStateValid(t))return;let e=[...t.map(t=>this.applyMove([...t]))],s=this.rotateLeft(e);this.updateGameState(s),this.completeMoveTasks()}moveDown(){let t=[...this.rotateRight(this.state).map(t=>[...t].reverse())];if(!this.isStateValid(t))return;let e=t.map(t=>this.applyMove([...t]).reverse()),s=this.rotateLeft(e);this.updateGameState(s),this.completeMoveTasks()}applyMove(t){let e=[],s=0;for(;s<t.length;){let a=t[s],r=t[s+1];a?a===r?(e.push(2*a),this.score+=2*a,s+=2):(e.push(a),s++):s++}for(;e.length<t.length;)e.push(0);return e}getScore(){return this.score}getState(){return this.state}getStatus(){return this.status}start(){this.status=t.gameStatuses.playing,this.completeMoveTasks(2)}restart(){this.resetState(),this.status=t.gameStatuses.idle,this.score=0}generateNewTile(){let t=this.getEmptyCells();if(!t.length)return;let[e,s]=t[Math.floor(Math.random()*t.length)];this.state[e][s]=.9>Math.random()?2:4}getEmptyCells(){return this.getState().flatMap((t,e)=>t.map((t,s)=>0===t?[e,s]:null)).filter(t=>null!==t)}rotateLeft(t){let e=[],s=t[0].length,a=t.length;for(let t=0;t<s;t++)e.push(Array.from({length:a},()=>""));for(let r=0;r<a;r++)for(let a=0;a<s;a++){let i=s-1-a;e[r][i]=t[a][r]}return e}rotateRight(t){let e=[],s=t[0].length,a=t.length;for(let t=0;t<s;t++)e.push(Array.from({length:a},()=>""));for(let t=0;t<a;t++)for(let a=0;a<s;a++){let r=t;e[s-1-a][r]=this.state[t][a]}return e}isStateValid(e){if(this.status!==t.gameStatuses.playing)return!1;for(let t of e){let e=!1,s=!1;for(let a=0;a<t.length-1;a++){if(t[a]===t[a+1]){e=!0;break}t[a]||(s=!0)}if(e||s)return!0}return!1}completeMoveTasks(e=1){for(let t=0;t<e;t++)this.generateNewTile();let s=this.getState();this.isVictory(s)?this.status=t.gameStatuses.win:this.isDefeat(s)&&(this.status=t.gameStatuses.lose)}isDefeat(t){let e=this.rotateRight(t);return[t,e].every(t=>!this.isStateValid(t))}isVictory(t){return t.flat().some(t=>2048===t)}resetState(){this.state=[...this.initialState.map(t=>[...t])]}updateGameState(t){this.state=t}}const e=new t,{startButton:s,gameScore:a,gameBoardRows:r,messageLose:i,messageWin:l,messageStart:o}={startButton:document.querySelector(".start"),gameScore:document.querySelector(".game-score"),gameBoardRows:document.querySelectorAll("tr"),messageLose:document.querySelector(".message-lose"),messageWin:document.querySelector(".message-win"),messageStart:document.querySelector(".message-start")},n=()=>{let t=e.getState();r.forEach((e,s)=>{for(let a of e.cells){a.textContent="",a.className="field-cell";let e=a.cellIndex,r=t[s][e];0!==r&&(a.textContent=r,a.classList.add(`${a.className}--${r}`))}})},h=()=>{i.classList.add("hidden"),l.classList.add("hidden"),o.classList.add("hidden"),"win"===e.getStatus()?l.classList.remove("hidden"):"lose"===e.getStatus()?i.classList.remove("hidden"):"idle"===e.getStatus()&&o.classList.remove("hidden")},m=()=>{a.textContent=e.getScore()};let u=!0;s.addEventListener("click",()=>{"Start"===s.textContent&&e.start(),"Restart"===s.textContent&&(e.restart(),s.textContent="Start",s.classList.remove("restart"),s.classList.add("start"),m()),n(),h(),u=!0}),document.addEventListener("keydown",t=>{if("idle"!==e.getStatus()){switch(t.key){case"ArrowLeft":e.moveLeft();break;case"ArrowRight":e.moveRight();break;case"ArrowUp":e.moveUp();break;case"ArrowDown":e.moveDown()}u&&(s.textContent="Restart",s.classList.remove("start"),s.classList.add("restart"),u=!1),h(),n(),m()}});
//# sourceMappingURL=index.bee2d2d6.js.map
