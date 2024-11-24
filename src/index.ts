import EnvVars from '@src/common/EnvVars';
import server from './server';
import {getLogger} from 'log4js';


// **** Run **** //

const SERVER_START_MSG = ('Express server started on port: ' + 
  EnvVars.Port.toString());

const logger = getLogger('listen');

server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG));
