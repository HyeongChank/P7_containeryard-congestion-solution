import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom'
import './simul.css'
import MyChartComponent from './MyChartComponent';
function Display(){
    const [mousePos, setMousePos] = useState({x:0, y:0});
    const [trucksData, setTrucksData] = useState([]);

    const [blockA, setBlockA] = useState();
    const [blockB, setBlockB] = useState();
    const [blockC, setBlockC] = useState();
    const [blockD, setBlockD] = useState();
    const [blockE, setBlockE] = useState();
    const [blockQ, setBlockQ] = useState();
    const [blockW, setBlockW] = useState();
    const [blockX, setBlockX] = useState();
    const [blockY, setBlockY] = useState();
    const [blockZ, setBlockZ] = useState();
    const [blockuntotal, setBlockuntotal] = useState();
    const [blocktotal, setBlocktotal] = useState();
    const [blockAt, setBlockAt] = useState();
    const [blockBt, setBlockBt] = useState();
    const [blockCt, setBlockCt] = useState();
    const [blockDt, setBlockDt] = useState();
    const [blockEt, setBlockEt] = useState();
    const [blockQt, setBlockQt] = useState();
    const [blockWt, setBlockWt] = useState();
    const [blockXt, setBlockXt] = useState();
    const [blockYt, setBlockYt] = useState();
    const [blockZt, setBlockZt] = useState();
    const [entryt, setEntryt] = useState();
    const [color, setColor] = useState();

    const [blockAp, setBlockAp] = useState();
    const [blockBp, setBlockBp] = useState();
    const [blockCp, setBlockCp] = useState();
    const [blockDp, setBlockDp] = useState();
    const [blockEp, setBlockEp] = useState();
    const [blockQp, setBlockQp] = useState();
    const [blockWp, setBlockWp] = useState();
    const [blockXp, setBlockXp] = useState();
    const [blockYp, setBlockYp] = useState();
    const [blockZp, setBlockZp] = useState();
    const [outcount, setOutcount] = useState(0);
    const [truckcount, setTruckcount] = useState();
    const [prediction, setPrediction] = useState();
    const [realdata, setRealdata] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8081/api/truckData')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                setTrucksData(data);
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation: ', error);
            });
    }, []);   

    const canvasRef = useRef(null);
    const [trucks, setTrucks] = useState([]);
    const drawEntry = (Entry, ctx) => { 
        ctx.fillStyle = 'blue';
        ctx.fillRect(Entry.x, Entry.y, Entry.width, Entry.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('Entry gate', Entry.x+5, Entry.y-5);
    }
    const drawExit = (Exit, ctx) => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(Exit.x, Exit.y, Exit.width, Exit.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('Exit gate', Exit.x-60, Exit.y-5); 
    }
    const drawPort = (port, ctx) => {
        ctx.fillStyle = 'blue';
        ctx.fillRect(port.x, port.y, port.width, port.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('Port', port.x+5, port.y-5); 
    }
    const drawIn_Container1 = (in_container, ctx) => {
        ctx.fillStyle = 'green';
        ctx.fillRect(in_container.x, in_container.y, in_container.width, in_container.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('block1', in_container.x, in_container.y-5); 

        // Draw the 3D effects
        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth); 
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x - in_container.depth, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x + in_container.width, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x, in_container.y + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x + in_container.width, in_container.y);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.closePath();
        ctx.stroke();
    }
    const drawIn_Container2 = (in_container, ctx) => {
        ctx.fillStyle = 'red';
        ctx.fillRect(in_container.x, in_container.y, in_container.width, in_container.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('block2', in_container.x, in_container.y-5); 

        // Now draw the 3D effects
        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth); 
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();
    
        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();
        // Drawing the top part of the 3D box
        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x + in_container.width, in_container.y);
        ctx.closePath();
        ctx.stroke();
    }
    const drawIn_Container3 = (in_container, ctx) => {
        ctx.fillStyle = 'orange';
        ctx.fillRect(in_container.x, in_container.y, in_container.width, in_container.height);
        ctx.fillStyle = 'black'; 
        ctx.font = '20px Arial'; 
        ctx.fillText('block3', in_container.x, in_container.y-5); 

       // Draw the 3D effects
        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth); 
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x - in_container.depth, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth + in_container.height);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x + in_container.width, in_container.y);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.lineTo(in_container.x - in_container.depth, in_container.y - in_container.depth);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x, in_container.y);
        ctx.lineTo(in_container.x, in_container.y + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.lineTo(in_container.x + in_container.width, in_container.y);
        ctx.closePath();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(in_container.x + in_container.width, in_container.y);
        ctx.lineTo(in_container.x + in_container.width, in_container.y + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth + in_container.height);
        ctx.lineTo(in_container.x - in_container.depth + in_container.width, in_container.y - in_container.depth);
        ctx.closePath();
        ctx.stroke();
    }





    // const drawOut_Container = (out_container, ctx) => {
    //     ctx.fillStyle = 'red';
    //     ctx.fillRect(out_container.x, out_container.y, out_container.width, out_container.height);
    //     ctx.fillStyle = 'black'; 
    //     ctx.font = '20px Arial'; 
    //     ctx.fillText('load_work', out_container.x, out_container.y); 
    // }
    const out_count = () =>{
        setOutcount(outcount +1)
    }
    
    const createTruck = (number, code, entryTime, arrive_unload_spot,
        start_unload_work, complete_unload_work, arrive_load_spot,
         start_load_work, complete_load_work, out_time,
         work_time, op,
         unload_count, load_count, in_yard_count,
          unload_wait_time, load_wait_time, entry_to_unload,
           entry_to_load, arrive_to_complete_unload, arrive_to_complete_load,
          complete_to_exit_unload, complete_to_exit_load, unload_to_load,
          unload_block, load_block, entry_count, exit_count, color,
          unload_progress_truck_count, load_progress_truck_count, visible,
          prediction, realdata) => {
        
        const canvas = canvasRef.current;
       
        const truck = {
            number: number,
            name: 'truck' + number,
            x: 0,
            y: canvas.height - 500,
            width: 50,
            height: 50,
            speed: 2,
            delay: 0,
            state: 0,
            work_code: code,
            entryTime: entryTime,
            arrive_unload_spot : arrive_unload_spot,
            start_unload_work: start_unload_work,
            complete_unload_work:complete_unload_work,
            color:getRandomColor(code, unload_block, load_block),
            arrive_load_spot : arrive_load_spot,
            start_load_work : start_load_work,
            complete_load_work : complete_load_work,
            unload_count:unload_count,
            load_count:load_count,
            in_yard_count:in_yard_count,
            entry_to_unload:entry_to_unload,
            entry_to_load:entry_to_load,
            arrive_to_complete_unload:arrive_to_complete_unload,
            arrive_to_complete_load:arrive_to_complete_load,
            complete_to_exit_unload:complete_to_exit_unload,
            complete_to_exit_load:complete_to_exit_load,
            unload_to_load:unload_to_load,
            out_time : out_time,
            //계산 제대로 안됨 계산은 다 서버에서 하고 넘어와야 할 듯함
            
            unload_wait_time: unload_wait_time,
            load_wait_time: load_wait_time,
            unload_block:unload_block,
            load_block:load_block,
            entry_count:entry_count,
            exit_count:0,
            unload_progress_truck_count:unload_progress_truck_count,
            load_progress_truck_count:load_progress_truck_count,
            visible : visible,
            prediction:prediction,
            realdata:realdata
 
        };

        setTrucks(trucks => [...trucks, truck]);
    }
    function getRandomColor(code, unload_block, load_block) {
        if(code ==='unload'){
            if(unload_block === 'A'){
                return 'skyblue'
            }
            else if(unload_block ==='B'){
                return 'green'
            }
            else{
                return 'blue'
            }
        }
        else if(code==='load'){
            if(load_block === 'Q'){
                return 'brown'
            }
            else if(load_block === 'W'){
                return 'orange'
            }
            else{
                return 'red'
            }
        }
        else{
            return 'black'
        }
        // const r = Math.floor(Math.random() * 256); // 랜덤한 빨간색 채널값
        // const g = Math.floor(Math.random() * 256); // 랜덤한 초록색 채널값
        // const b = Math.floor(Math.random() * 256); // 랜덤한 파란색 채널값
        // return `rgb(${r},${g},${b})`;

    }
    const drawTruck = (truck, ctx) => {
        // 현재는 truckcount 에 in_yard_count가 들어가고 있음. 예측치도 구해서 chart 페이지에 실제값, 예측값이 전달되고 그려지도록 해야 함
        // 예측 모델을 써서 만들어야 함
        setTruckcount(truck.in_yard_count)
        setPrediction(truck.prediction)
        setRealdata(truck.realdata)

        
        if (truck.visible) {
            ctx.fillStyle = truck.color;
            ctx.fillRect(truck.x, truck.y, truck.width, truck.height);
            ctx.fillStyle = 'black';
            ctx.font = "15px Arial";
            ctx.fillText(`${truck.name} : ${truck.work_code}`, truck.x, truck.y-10);
            if(truck.work_code==='unload' && mousePos.x >= truck.x && mousePos.x <= truck.x + truck.width && mousePos.y >= truck.y && mousePos.y <= truck.y + truck.height){
                ctx.font = "15px Arial";
                ctx.fillText(`반입 대기시간: ${truck.unload_wait_time/1000}m`, truck.x, truck.y - 30); // truck's unload wait time
                ctx.fillText(`반입장: ${truck.unload_block}`, truck.x, truck.y - 50); // truck's unload wait time
             
            }
            else if(truck.work_code==='load' && mousePos.x >= truck.x && mousePos.x <= truck.x + truck.width && mousePos.y >= truck.y && mousePos.y <= truck.y + truck.height){
                ctx.font = "15px Arial";
                ctx.fillText(`반출 대기시간: ${truck.load_wait_time/1000}m`, truck.x, truck.y - 30); // truck's unload wait time
                ctx.fillText(`반출장: ${truck.load_block}`, truck.x, truck.y - 50); // truck's unload wait time
            }
            else if(truck.work_code==='both' && mousePos.x >= truck.x && mousePos.x <= truck.x + truck.width && mousePos.y >= truck.y && mousePos.y <= truck.y + truck.height){
                ctx.font = "15px Arial";
                ctx.fillText(`반출 대기시간: ${truck.load_wait_time/1000}m`, truck.x, truck.y - 30); // truck's unload wait time
                ctx.fillText(`반입 대기시간: ${truck.unload_wait_time/1000}m`, truck.x, truck.y - 50); // truck's unload wait time
                ctx.fillText(`반입장: ${truck.unload_block} 반출장: ${truck.load_block}`, truck.x, truck.y - 70); // truck's unload wait time
            }
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas === null) {  // canvas가 null인지 확인합니다.
            return;
        }
        const ctx = canvas.getContext('2d');
        
        if (ctx === null) {  // ctx가 null인지 확인합니다.
            return;
        }
        
        const createEntry = () => {
            const canvas = canvasRef.current;
            return {
                x: 0,
                y: canvas.height - 500,
                width: 20,
                height: 50,
            }
        }
        const Entry = createEntry();

        const createExit =() => {
            const canvas = canvasRef.current;
            return {
                x : 780,
                y : canvas.height - 500,
                width : 20,
                height : 50
            }
        }
        const Exit = createExit();

        const createPort = () => {
            const canvas = canvasRef.current;
            return {
                x: 0,
                y: canvas.height -150,
                width: 800,
                height: 150
            }
        }
        const port = createPort();

        const createIn_Container = ()=> {
            const canvas = canvasRef.current;
            return {
                x : 330,
                y : canvas.height - 520,
                width : 100,
                height : 50,
                depth: 20 
            }
        }
        const createIn_ContainerWithOffset = (offsetX, offsetY) => {
            const in_container = createIn_Container();
            in_container.x += offsetX; // Add the offset to the x position
            in_container.y += offsetY; // Add the offset to the x position
            return in_container;
        }
        const in_container1 = createIn_Container();
        const in_container2 = createIn_ContainerWithOffset(20, 20);
        const in_container3 = createIn_ContainerWithOffset(40,40);
 
        const createOut_Container = () => {
            const canvas = canvasRef.current;
            return {
                x : 330,
                y : canvas.height - 370,
                width : 100,
                height : 50,
                depth: 20
            }
        }
        const createOut_ContainerWithOffset = (offsetX, offsetY) => {
            const out_container = createOut_Container();
            out_container.x += offsetX; // Add the offset to the x position
            out_container.y += offsetY; // Add the offset to the x position
            return out_container;
        }
        const out_container1 = createOut_Container();
        const out_container2 = createOut_ContainerWithOffset(20, 20);
        const out_container3 = createOut_ContainerWithOffset(40,40);

 
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.rect(0, 0, canvas.width, canvas.height);
            ctx.lineWidth = 2;
            ctx.strokeStyle = 'black';
            ctx.stroke();

            drawEntry(Entry, ctx);
            drawExit(Exit, ctx);
            drawPort(port, ctx);
            //drawIn_Container(in_container, ctx);
            drawIn_Container1(in_container1, ctx);
            drawIn_Container2(in_container2, ctx);
            drawIn_Container3(in_container3, ctx);

            drawIn_Container1(out_container1, ctx);
            drawIn_Container2(out_container2, ctx);
            drawIn_Container3(out_container3, ctx);


            let updatedTrucks = trucks.map(truck => {
                
                setEntryt(truck.entryTime);
                setBlockuntotal(blockA+blockB+blockC+blockD+blockE);
                setBlocktotal(blockQ+blockW+blockX+blockY+blockZ);
                // const unloadCountElement = document.getElementById('unload_count');
                // const loadCountElement = document.getElementById('load_count');
                // const unloadBlockElement = document.getElementById('unload_block');
                // const loadBlockElement = document.getElementById('load_block');
                const entryCountElement = document.getElementById('entry_count');
                // const exitCountElement = document.getElementById('exit_count');
                entryCountElement.textContent = `${truck.entry_count}`;
                // exitCountElement.textContent = `${truck.exit_count}`;
                //unloadCountElement.textContent = `${truck.unload_count}`;
                //loadCountElement.textContent = `${truck.load_count}`;
                //unloadBlockElement.textContent = `${truck.unload_block} : `;
                //loadBlockElement.textContent = `${truck.load_block} : `;

                if(truck.unload_block ==='A'){
                    setBlockAp(truck.unload_progress_truck_count);
                    setBlockA(truck.unload_count);
                    setBlockAt(truck.unload_wait_time/1000);
                }
                if(truck.unload_block ==='B'){
                    setBlockBp(truck.unload_progress_truck_count);                    
                    setBlockB(truck.unload_count);
                    setBlockBt(truck.unload_wait_time/1000);
                }
                if(truck.unload_block ==='C'){
                    setBlockCp(truck.unload_progress_truck_count);
                    setBlockC(truck.unload_count);
                    setBlockCt(truck.unload_wait_time/1000);
                }
                if(truck.unload_block ==='D'){
                    setBlockDp(truck.unload_progress_truck_count);
                    setBlockD(truck.unload_count);
                    setBlockDt(truck.unload_wait_time/1000);
                }
                if(truck.unload_block ==='E'){
                    setBlockEp(truck.unload_progress_truck_count);
                    setBlockE(truck.unload_count);
                    setBlockEt(truck.unload_wait_time/1000);
                }

                if(truck.load_block ==='Q'){
                    setBlockQp(truck.load_progress_truck_count);
                    setBlockQ(truck.load_count);
                    setBlockQt(truck.load_wait_time/1000);
                }
                if(truck.load_block ==='W'){
                    setBlockWp(truck.load_progress_truck_count);
                    setBlockW(truck.load_count);
                    setBlockWt(truck.load_wait_time/1000);
                }
                if(truck.load_block ==='X'){
                    setBlockXp(truck.load_progress_truck_count);
                    setBlockX(truck.load_count);
                    setBlockXt(truck.load_wait_time/1000);
                }
                if(truck.load_block ==='Y'){
                    setBlockYp(truck.load_progress_truck_count);
                    setBlockY(truck.load_count);
                    setBlockYt(truck.load_wait_time/1000);
                }
                if(truck.load_block ==='Z'){
                    setBlockZp(truck.load_progress_truck_count);
                    setBlockZ(truck.load_count);
                    setBlockZt(truck.load_wait_time/1000);
                }


                if (truck.work_code === 'unload') {
 
                    if (truck.state === 0) {
                        if (truck.x < 400 - truck.width) {
                            truck.x += truck.speed*3.5/truck.entry_to_unload*1000;
                        }
                        else {
                            truck.state = 1;
                        }
                    }
                    else if (truck.state === 1) {
                        truck.delay += 1;
                        // 5초 설정
                        if (truck.delay > truck.arrive_to_complete_unload*50/1000) {
                            truck.x += 50;
                            truck.state = 2;
                        }
                    }
                    else if (truck.state === 2) {
                        if (truck.x < canvas.width - truck.width) {
                            truck.x += truck.speed*3.5/truck.complete_to_exit_unload*1000;
                        }
                        else {
                            truck.visible = false;
                            truck.exit_count +=1;
                            out_count();
                            truck.state = 99;
                        }
                    }
                    
                }

                if(truck.work_code === 'load'){
                    if (truck.state ===0){
                        if (truck.x < 200 - truck.width) {
                            //계산 잘못됨 다시 해보기
                            //truck.x += (truck.speed*truck.entry_to_spot/(400 - truck.width));
                            truck.x += truck.speed*5.0/truck.entry_to_load*1000;
                        }
                        else{
                            truck.state =5;
                        }
                    }
                    else if (truck.state ===5){
                        if(truck.y < 300- truck.height){
                            //truck.y += (truck.speed*truck.entry_to_spot/(400 - truck.width));
                            truck.y +=  truck.speed*5.0/truck.entry_to_load*1000;
                        }
                        else{
                            truck.state =6;
                        }
                    }
                    else if ( truck.state ===6){
                        if (truck.x < 400 - truck.width) {
                            //entry_to_spot 도 서버에서 계산해서 넘어와야 할 듯, 여기서 하니까 제대로 작동 안함
                            truck.x +=  truck.speed*5.0/truck.entry_to_load*1000;
                            //truck.x += truck.speed;
            
                        }
                        else{
                            truck.state = 1;
                        }
                    }
                    else if (truck.state === 1){
                        truck.delay += 1;
                        // 5초 설정
                        if(truck.delay>truck.arrive_to_complete_load*50/1000){
                            truck.x +=50;
                            truck.state=4;
                        }
                    }
                    else if (truck.state ===4){
                        if(truck.x<650-truck.width){
                            truck.x += truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.state = 3;
                        }
                    }
                    else if(truck.state ===3){
                        if(truck.y>150-truck.height){
                            truck.y-= truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.state = 2;
                        }
                    }
                    else if (truck.state ===2){
                        if(truck.x < canvas.width - truck.width){
                            truck.x += truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.visible = false;
                            truck.exit_count +=1;
                            out_count();
                            truck.state = 99;
                        }
                    }
                }

                if(truck.work_code === 'both'){
                    // 속도 계산해야 함
                    if (truck.state ===0){
                        // 초당 100px 이동중
                        if (truck.x < 400 - truck.width) {
                            truck.x += truck.speed*3.5/truck.entry_to_unload*1000;
                        }
                        else{
                            truck.state =1;
                        }
                    }
                    else if (truck.state ===5){
                        if(truck.y < 300- truck.height){
                            truck.y += (truck.speed*1.5/truck.unload_to_load)*1000;
                        }
                        else{
                            truck.state =7;
                        }
                    }

                    else if (truck.state === 1){
                        truck.delay += 1;
                        // 5초 설정 250번의 호출(20밀리세컨드 기준)
                        if(truck.delay>truck.arrive_to_complete_unload*50/1000){
                            truck.x +=50;
                            truck.state=5;
                            truck.delay=0;
                        }
                    }
                    else if (truck.state === 7){
                        truck.delay += 1;
                        // 5초 설정
                        if(truck.delay>truck.arrive_to_complete_load*50/1000){
                            truck.state=4;
                        }
                    }
                    else if (truck.state ===4){
                        if(truck.x<650-truck.width){
                            truck.x += truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.state = 3;
                        }
                    }
                    else if(truck.state ===3){
                        if(truck.y>150-truck.height){
                            truck.y-=truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.state = 2;
                        }
                    }
                    else if (truck.state ===2){
                        if(truck.x < canvas.width - truck.width){
                            truck.x += truck.speed*5.0/truck.complete_to_exit_load*1000;
                        }
                        else{
                            truck.visible = false;
                            truck.exit_count +=1;
                            out_count();
                            truck.state = 99;
                        }
                    }
                }
                return truck;
            });
        setTrucks(updatedTrucks);
        
        trucks.forEach(truck => drawTruck(truck, ctx));
        // requestAnimationFrame(animate);
        }
        // 호출 사이의 간격 0.02초
        const intervalId = setInterval(animate, 20); // 20 milliseconds between each frame

        return () => {
            clearInterval(intervalId); // Clean up on unmount
        }
    }, [trucks]);

    const handleClick = () => {
        trucksData.forEach((truckData, i) => {
            setTimeout(() => {
                createTruck(truckData.number, truckData.code, truckData.entryTime, truckData.arrive_unload_spot,
                    truckData.start_unload_work, truckData.complete_unload_work, truckData.arrive_load_spot,
                     truckData.start_load_work, truckData.complete_load_work, truckData.out_time,
                     truckData.work_time, truckData.op,
                     truckData.unload_count, truckData.load_count, truckData.in_yard_count,
                      truckData.unload_wait_time, truckData.load_wait_time, truckData.entry_to_unload,
                       truckData.entry_to_load, truckData.arrive_to_complete_unload, truckData.arrive_to_complete_load,
                      truckData.complete_to_exit_unload, truckData.complete_to_exit_load, truckData.unload_to_load,
                      truckData.unload_block, truckData.load_block, truckData.entry_count, truckData.exit_count, color,
                      truckData.unload_progress_truck_count, truckData.load_progress_truck_count, truckData.visible,
                      truckData.prediction, truckData.realdata);
            }, truckData.entryTime);
        });
    };

    const mainpageGo = () =>{
        navigate('/');
    }
    return (
        <div>
        
            <div className='menu'>
                <button id='btmaingo' onClick={mainpageGo}>Mainpage 이동</button>
                <button id='btstart' onClick={handleClick}>Start</button>
            </div>
            <div className='tot'>
                <div id='canv'>
                <canvas ref={canvasRef} width={800} height={600}
                onMouseMove={e=>{
                    var rect = e.target.getBoundingClientRect();
                    setMousePos({x:e.clientX - rect.left, y:e.clientY - rect.top});
                }}  />
                </div>
                
                <div id='etc'>
                    <div id='dashb'>
                    <p id='intitle'>컨테이너 야드 현황판</p>
                        <div id='dashboard'>
                            
                            <div id= 'entry_exit_ds'>
                                <p id='dashboardP'>입차(대) : <span id='entry_count'> 0</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>입차시간(초) : {entryt/1000}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <span>출차(대) : </span>
                                <span id='exit_count'>{outcount}</span>
                                </p>
                            </div>
                            {/* <div id='unload5'>
                                <p className='unloadP'>반입장 대기차량 : <span>{blockuntotal}</span></p>
                                
                                
                                <span id='unload_block'>unload_block : </span>
                                <span id='unload_count'>unload_count</span>
                                <p id='unload'>block : 작업 | 대기 | 대기시간</p>
                                <p id='unload'>block1 : {blockAp}대, {blockA}대, {blockAt}</p>
                                <p id='unload'>block2 : {blockBp}대, {blockB}대, {blockBt}</p>
                                <p id='unload'>block3 : {blockCp}대, {blockC}대, {blockCt}</p>
                                <p id='unload'>blockD : {blockDp}대, {blockD}대, {blockDt}</p>
                                <p id='unload'>blockE : {blockEp}대, {blockE}대, {blockEt}</p>
                            </div>
                            <div id='load5'>
                                <p className='loadP'>반출장 대기차량 : <span>{blocktotal}</span></p>
                                <span id='load_block'>load_block : </span>
                                <span id='load_count'>load_count</span>
                                <p id='unload'>block : 작업 | 대기 | 대기시간</p>
                                <p id='load'>block1 : {blockQp}대, {blockQ}대, {blockQt}</p>
                                <p id='load'>block2 : {blockWp}대, {blockW}대, {blockWt}</p>
                                <p id='load'>block3 : {blockXp}대, {blockX}대, {blockXt}</p>
                                <p id='load'>blockY : {blockYp}대, {blockY}대, {blockYt}</p>
                                <p id='load'>blockZ : {blockZp}대, {blockZ}대, {blockZt}</p>
                            </div> */}
                            <div className='work_block'>
                            <div className='unload_dashboard'>
                                <p id='blockname'>반입장</p>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Block</th>
                                        <th>작업(대)</th>
                                        <th>대기(대)</th>
                                        <th>대기시간</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Block1</td>
                                        <td>{blockAp}</td>
                                        <td>{blockA}</td>
                                        <td>{blockAt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block2</td>
                                        <td>{blockBp}</td>
                                        <td>{blockB}</td>
                                        <td>{blockBt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block3</td>
                                        <td>{blockCp}</td>
                                        <td>{blockC}</td>
                                        <td>{blockCt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block4</td>
                                        <td>{blockDp}</td>
                                        <td>{blockD}</td>
                                        <td>{blockDt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block5</td>
                                        <td>{blockEp}</td>
                                        <td>{blockE}</td>
                                        <td>{blockEt}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className='load_dashboard'>
                                <p id='blockname'>반출장</p>
                                <table>
                                    <thead>
                                    <tr>
                                        <th>Block</th>
                                        <th>작업(대)</th>
                                        <th>대기(대)</th>
                                        <th>대기시간</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    <tr>
                                        <td>Block1</td>
                                        <td>{blockQp}</td>
                                        <td>{blockQ}</td>
                                        <td>{blockQt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block2</td>
                                        <td>{blockWp}</td>
                                        <td>{blockW}</td>
                                        <td>{blockWt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block3</td>
                                        <td>{blockXp}</td>
                                        <td>{blockX}</td>
                                        <td>{blockXt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block4</td>
                                        <td>{blockYp}</td>
                                        <td>{blockY}</td>
                                        <td>{blockYt}</td>
                                    </tr>
                                    <tr>
                                        <td>Block5</td>
                                        <td>{blockZp}</td>
                                        <td>{blockZ}</td>
                                        <td>{blockZt}</td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div id='chartsim'>
                        <p id='intitle'>야드 내 트럭 수(대)</p>
                        <div id='ct'>
                          <MyChartComponent data = {trucksData} truckcount={truckcount} prediction={prediction}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Display