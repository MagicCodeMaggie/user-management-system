const API_URL = "https://api.api-ninjas.com/v1/randomuser"; //server接口可以拿到randomuser的模拟信息
const TOKEN = "WjvXA4nbitDPxWDV+psswg==36xQdafhs8jdahuP"; //自己在API-Ninjas注册生成的token
let globalUsers = null;//初始化为空，之后可以赋值为任意类型数据，这里会被赋值为array类型的数据

/*This function sends a GET request to the API endpoint specified by API_URL 
using the axios library, 
including an X-Api-Key header with the value of TOKEN for authentication.*/ 

function fetchUser(){
    return axios.get(API_URL,{  
        headers:{
            "X-Api-Key":TOKEN,
        }
    });
}

async function initAddUserButtonEvent(){
    const addUserButton = document.getElementById("addUserButton");
    addUserButton.addEventListener("click",async(event)=>{   //click名字不能随便改，event名字可以改成e，效果一样
        const result = await fetchUser();  
        globalUsers = [...globalUsers, result.data]  //将新得到的result.data添加到globalUsers的末尾
        renderTable(globalUsers);
    })
}

function initSearchInputEvent(){
    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input",event=>{    //input名字不能改，event名字可以改成e，效果一样
        const searchTerms = event.target.value.toLowerCase(); //get the user value
        if(!searchTerms || searchTerms === "") {  //searchTerms是一个字符串，如果为Null值或者空字符串，就不做任何操作直接返回
            renderTable(globalUsers);
            return;
        }
        //调用数组的filter方法，将数组中每一个元素的name属性值转换为小写，然后判断是否包含searchTerms        
        //const result = globalUsers.filter((user)=>user.name.toLowerCase().includes(searchTerms));
        const result = globalUsers.filter((user)=>user.name.toLowerCase().startsWith(searchTerms));//注意不是startWith(),可以实现前几个字符匹配
        renderTable(result);
    });
}

function deleteUser(email){
    globalUsers = globalUsers.filter((user)=>{return user.email !== email});  //加花括号必须加return，否则就只是普通的判断表达式，返回的是一个布尔值
    //globalUsers = globalUsers.filter((user)=>user.email !== email);  //这样写也对，注意不能加花括号 一条语句默认就是return它
    renderTable(globalUsers)
}

//参数users是一个对象数组，用数组的map方法将数组中的每个字典user对象转换为字符串
//将所有字符串join成一个字符串，返回值是一个字符串
//每一行的结尾是一个Delete的button按钮，点击后调用deleteUser(email)
function buildUsers(users){
    return users.map(user=>`        
        <tr>
            <td>${user.username}</td>
            <td>${user.sex}</td>
            <td>${user.address}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.birthday}</td>
            <td><button id="deleteButton" onClick="deleteUser('${user.email}')">Delete</button></td>
        </tr>
        `).join("");
}

function renderTable(users){
    const bodyContainer = document.getElementById("userTable");
     //使用模版字符串渲染前端页面
    bodyContainer.innerHTML = `  
        <table>
            <thead>
                <tr>
                    <th>Username</th>
                    <th>Sex</th>
                    <th>Address</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>DOB</th>
                </tr>
            </thead>
            <tbody>${buildUsers(users)}</tbody>
        </table>`;
}

function renderLoadingScreen(){
    const tableContainer = document.getElementById("userTable");
    tableContainer.innerHTML = "<p>Loading.. Please wait!</p>";
}

async function main(){
    try{
        renderLoadingScreen()
        const result = await fetchUser();  //必须等到fetchUser函数执行完才能执行后面的代码
        globalUsers = [result.data]; //result.data是一个字典对象,里面包含了多个用户信息的键值对，globalUsers是一个只有一个元素的对象数组
        renderTable(globalUsers);
        initSearchInputEvent();
        initAddUserButtonEvent()
    }catch(e){
        const table = document.getElementById('userTable');
        table.innerHTML = "Error cannot load data";
    }
}

main();