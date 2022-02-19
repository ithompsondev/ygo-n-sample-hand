import express from 'express'
import session from 'express-session'

export const port = process.env.PORT || 8000
export const host = process.env.HOST || 'localhost'

export function setup() {
    return express()
}

export function useEJS(server) {
    server.set('view engine','ejs')
}

export function accessRequestBody(server) {
    // Allows us to access the request body to get form information
    server.use(express.urlencoded({ extended: true }))
}

export function mountRouter(server,mount,router) {
    server.use(mount,router)
}

export function setSession(server) {
    server.use(session({
        secret: 'sxexsxsxixoxn',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: false }
    }))
}