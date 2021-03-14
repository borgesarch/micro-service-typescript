import glob from 'glob'
import path from 'path'

export default glob.sync(path.join(__dirname, '/**/*.ts'))
