window.addEventListener('load',function(){  
    //初始化
    let numBox = document.querySelector('.numBox');
    numBox.value = 0;
    numBox.disabled = 'disabled';
    let res = false;
    //res用于输入时是否替换原来算式,比如按下=以后要替换原来的算式
    //添加计算器按钮功能
    let btn = document.querySelectorAll('input');
    for(let i=0;i<btn.length;i++){
        //for循环给所有按钮添加点击事件
        btn[i].addEventListener('click',function(){            
                switch(this.value){
                    case '+':
                    case '-':
                    case '*':
                    case '/':
                        //当出错之后取消加减乘除功能
                        if(numBox.value == '出错了')break;
                        //先判断此时框内算式的最后一个是不是+-*/,如果是,那就替换掉它
                        //如果不是,那就加上
                            let last = numBox.value[numBox.value.length-1];
                            if(last=='+'||last=='-'||last=='*'||last=='/'){
                                numBox.value = `${ numBox.value.toString().substring(0,numBox.value.length-1)}`+`${this.value}`;
                                break;
                            }
                            numBox.value = `${numBox.value}`+`${this.value}`;
                            res = false;
                            break;
                    case 'C':
                        //归零功能
                        numBox.value=0; 
                        break;
                    case '':
                        //用字符串裁剪的方法实现退格功能
                        numBox.value = numBox.value.toString().substring(0,numBox.value.length-1);
                        if(numBox.value==''){
                            numBox.value = 0;
                        }
                        break;
                    case '+/-':
                        //取负数
                        //如下,我用了eval()函数来省去了四则运算的代码
                        //当eval()出错时,框内算式改为 '出错了' 并且将res设为true
                        try {
                            numBox.value = -(eval(numBox.value));
                            res = true;
                        } catch (error) {
                            numBox.value = '出错了';
                            res = true;
                        }
                        break;
                    case '.':
                        //添加小数点
                        if(res == true)break;
                        let index = 0;//索引号
                        let mark = 0;//标记
                        for(let i=0;i<numBox.value.length;i++){
                            //每当算式中出现一个+-*/mark记录当前索引号index,并重新判定小数点功能
                            //比如0.3+0.03+333.3 输入0.3后判定算式已经含有小数点，之后再点小数点将不会实现
                            //在mark记录了第一个+的位置后，小数点功能重新判定，改为判定+之后的算式有没有小数点
                            //接下来一直重复这个过程，是小数点功能正常
                            if(numBox.value[i]=='+'||numBox.value[i]=='-'||numBox.value[i]=='*'||numBox.value[i]=='/'){
                                mark = index;
                            }
                            else{
                                index++;
                            }
                        }
                        let later = numBox.value.substring(mark,numBox.value.length);
                        // console.log(later);
                        let last1 = numBox.value[numBox.value.length-1];
                        if(last1=='+'||last1=='-'||last1=='*'||last1=='/'||later.indexOf(".")!=-1)break;
                        else{
                            numBox.value = `${numBox.value}`+`.`;
                            break;
                        }
                    case 'x*x':
                        try {
                            let last = numBox.value[numBox.value.length-1];
                            if(last=='+'||last=='-'||last=='*'||last=='/'){
                                let x = eval(numBox.value.toString().substring(0,numBox.value.length-1));
                                if(x==Infinity||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res =  true;
                                    break;
                                }
                                else{
                                    numBox.value = x*x;
                                }
                            }
                            else{
                                let x = eval(numBox.value);
                                if(x==Infinity){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                    numBox.value = x*x;
                                }
                            }
                            res =true;
                                } catch (error) {
                                    numBox.value = '出错了';
                                    res = true;
                                }
                        break;
                    case 'x^1/2':
                        try {
                            let last = numBox.value[numBox.value.length-1];
                            if(last=='+'||last=='-'||last=='*'||last=='/'){
                                let x = eval(numBox.value.toString().substring(0,numBox.value.length-1));
                                if(x == Infinity||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                            }
                            else{
                                let x = eval(numBox.value);
                                if(x==Infinity||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                    numBox.value = Math.sqrt(x);
                                }
                                
                            }
                        res =true;
                            } catch (error) {
                                numBox.value = '出错了';
                                res = true;
                            }
                        break;
                    case '1/x':
                        try {
                            let last = numBox.value[numBox.value.length-1];
                            if(last=='+'||last=='-'||last=='*'||last=='/'){
                                let x = eval(numBox.value.toString().substring(0,numBox.value.length-1));
                                if(1/x==Infinity||x==Infinity||isNaN(1/x)||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                    numBox.value = 1/x;
                                }
                            }
                            else{
                                let x = eval(numBox.value);
                                if(1/x==Infinity||isNaN(1/x)||isNaN(x)||x==Infinity){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                    numBox.value = 1/x;
                                }
                                
                            }
                        res = true;
                        } catch (error) {
                            numBox.value = '出错了';
                            res = true;
                        }
                        break;
                    case '=':
                        
                        // numBox.value = eval(numBox.value);
                        try {
                            res = true;
                            let last = numBox.value[numBox.value.length-1];
                            if(last=='+'||last=='-'||last=='*'||last=='/'){
                                let x = eval(numBox.value.toString().substring(0,numBox.value.length-1));
                                if(x==Infinity||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                    numBox.value = x;
                                }
                            }
                            else{
                                let x = eval(numBox.value);
                                if(x==Infinity||isNaN(x)){
                                    numBox.value = '除数不能为0'
                                    res = true;
                                    break;
                                }
                                else{
                                   numBox.value = x*10/10;
                                }
                                
                            }
                        } catch (error) {
                            numBox.value = '出错了';
                            res = true;
                        }
                        break;
                    default:
                        if(res == false){
                            numBox.value = `${numBox.value==0&&numBox.value.indexOf('.')==-1?'':numBox.value}`+`${this.value}`;
                        }
                        else{
                            numBox.value = this.value;
                            res = false;
                        }
                }
                
        })
    }
})