import glob from 'glob'
export default glob.sync(`${__dirname}/middlewares/**/*.ts`)