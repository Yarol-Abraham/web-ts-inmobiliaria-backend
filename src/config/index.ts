export default {
    jwtSecret: process.env.JWT_SECRET || 'secret',
    jwtExpire: process.env.JWT_EXPIRES || '90d',
    id: "voxdatacomm"
}