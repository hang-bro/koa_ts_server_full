/*
 * @Descripttion:
 * @Author: HYH
 * @LastEditors: HYH
 * @LastEditTime: 2023-06-14 14:14:23
 */
import os from 'os'


function getIPAdress() {
	var interfaces = os.networkInterfaces()
	for (var devName in interfaces) {
		var iface = interfaces[devName]
		for (var i = 0; i < iface.length; i++) {
			var alias = iface[i]
			if (
				alias.family === 'IPv4' &&
				alias.address !== '127.0.0.1' &&
				!alias.internal
			) {
				return alias.address
			}
		}
	}
}

function getClientIP(req: any) {
	return (
		req.headers['x-forwarded-for'] || // 判断是否有反向代理 IP
		req.connection.remoteAddress || // 判断 connection 的远程 IP
		req.socket.remoteAddress || // 判断后端的 socket 的 IP
		req.connection.socket.remoteAddress
	)
}


/**获取本地IP地址 */
export const getLocalIp = () => {
	const ips = os.networkInterfaces()
	const arr: string[] = []
	for (const item in ips) {
		const ip = ips[item] as unknown as any
		for (const content of ip) {
			if (content.family === "IPv4" && content.address !== "127.0.0.1" && !content.internal) {
				arr.push(content.address);
			}
		}

	}
	return arr
}