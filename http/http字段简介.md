
>HTTP（HyperTextTransferProtocol） 即超文本传输协议，目前网页传输的的通用协议。
HTTP协议采用了请求/响应模 型，浏览器或其他客户端发出请求，服务器给与响应。
就整个网络资源传输而言，包括 **message-header** 和 **message-body** 两部分。首先传递 **message-header**，即http header消息 。

http header 消息通常被分为4个部分：
- general  header
- request header
- response header
- entity header
但是这种分法就理解而言，感觉界限不太明确。根据维基百科对http header内容的组织形式，大体分为Request和Response两部分。
#### request 部分
```table
header |  解释(<)  | 示例
Accept	 |表示客户端能希望接收的数据类型   | Accept: text/plain, text/html
```