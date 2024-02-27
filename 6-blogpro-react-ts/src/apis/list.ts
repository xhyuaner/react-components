import { http } from '@/utils'

import type { ResType } from '@/apis/shared'

// 2. 定义具体接口类型
type ChannelItem = {
    id: number
    name: string
}

type ChannelRes = {
    channels: ChannelItem[]
}

// 发送请求
export function fetchChannelAPI() {
    return http.request<ResType<ChannelRes>>({
        url: '/channels',
        method: 'get'
    })
}