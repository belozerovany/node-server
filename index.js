const http = require('http');
const fs = require('fs');


const server = http.createServer((req,res) => {
  
    res.setHeader('Content-Type','text/html');//помагает указать что мы используем теги html
    if (/jpg|png|gif|jpeg|js/.test(req.url)) { // проверяем соответствие url запроса
      
        fs.readFile(req.url.replace('/',''), (err, data) => {
            if (err) { 
                res.end(); 
                throw new Error('Error while reading file: ' + err); 
            }
            else { 
               res.end(data); 
            }
        });
        return;
     }
              
    fs.readFile('index.html', 'utf-8', (err, data) => {
        
        if (err) {
            res.end('<strong>Error!</strong>');
            throw new Error('Error while reading index.html');
        };
        const getDate = () => new Date().toLocaleString();
        res.end(data.replace('</body>', `<div>${getDate()}</div></body>`));
    });
   
 


    // http.get('http://wttr.in/~kharkov', (response) => {//запрос к сайту погоды
    //     if (response.statusCode !== 200) { res.end('<strong style="color:red">Error!</strong>'); }
    //     else {   response.setEncoding('utf-8');
    //                  let result = '';
    //                  response.on('data', data => result += data);
    //                  response.on('end', () => {
    //                      const processeResult = result.replace('</style>', 'body{background: #000;color: #fff;}</style>')
    //                     res.end(processeResult)
    //                 });
                     
    //     }
    // }); 
});
 

server.listen(4000, () => {
    console.log('Server is running on localhost: 4000');
});