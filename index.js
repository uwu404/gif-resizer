'use strict';
const gifsicle = require("gifsicle");
const execa = require("execa");
const fs = require("fs")
const imageSize = require("image-size");


/**
 * @param {Buffer|string} data 
 * @param {{ width: number, height: number, stretch: boolean, colors: number }} ops 
 * @returns {Promise<Buffer>}
 */

function gifResize(data, ops={}) {

    const gif = new Promise(async (res, rej) => {

        const buffer = Buffer.isBuffer(data) ? data : fs.readFileSync(data)

        const dimensions = imageSize(buffer)

        if (dimensions.type !== "gif") res(data)

        const infoH = () => {
            const mesure = dimensions.width / dimensions.height
            const ratio = ops.width / ops.height
            const toSize = dimensions.width / ratio
            const x = ratio < mesure ? f((dimensions.width - dimensions.height * ratio)/2) : f((dimensions.height - toSize)/2)
            const info = ratio >= mesure ? `0,${x}+${dimensions.width}x${f(toSize)}` : `${x},0+${f(dimensions.height * ratio)}x${dimensions.height}`
            return info
        }

        const infoW = () => {
            const mesure = dimensions.height / dimensions.width
            const ratio = ops.height / ops.width
            const toSize = dimensions.height / ratio
            const x = ratio < mesure ? f((dimensions.height - dimensions.width * ratio)/2) : f((dimensions.width - toSize)/2)
            const info = ratio >= mesure ? `${x},0+${f(toSize)}x${dimensions.height}` : `0,${x}+${dimensions.width}x${f(dimensions.width * ratio)}`
            return info
        }

        const size = dimensions.width > dimensions.height ? infoW() : infoH()

        const args = ['--no-warnings', '--no-app-extensions']
        if (!ops.stretch && ops.height && ops.width) args.push('--crop', size) 
        if (typeof ops.colors === "number") args.push(`--colors=${ops.colors}`)

        if (ops.height && ops.width) {
            args.push("--resize", `${ops.width}x${ops.height}`)
        } else if (ops.height) {
            args.push(`--resize-height=${ops.height}`)
        } else if (ops.width) {
            args.push(`--resize-width=${ops.width}`)
        }

        const { stdout } = await execa(gifsicle, args, {
            encoding: null,
            maxBuffer: Infinity,
            input: buffer
        }).catch(err => rej(err))

        res(stdout)

    })

    return gif
}

function f(n) {
    return Math.trunc(n)
}

module.exports = gifResize