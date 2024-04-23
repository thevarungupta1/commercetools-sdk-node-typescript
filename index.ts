import dotenv from 'dotenv';
import server from './src/app'

dotenv.config({ path: './config/config.env' });


// start
server.listen(3000, () => {
    console.log('server listening on port: 3000');
})

console.log(process.env.CTP_AUTH_URL)

export default server
