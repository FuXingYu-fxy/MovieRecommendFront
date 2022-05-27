import request from "@/app/request";

export function shutDown() {
  return request({
    url: "/save",
    method: "post"
  })
}