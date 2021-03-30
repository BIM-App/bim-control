import dayjs from 'dayjs'

export function getPresent(starttime, endtime) {
  const start = dayjs(starttime).unix()
  const end = dayjs(endtime).unix()
  const now = dayjs().unix()
  const present = (now - start) / (end - start) * 100
  console.log(end)
  console.log(now)
  console.log(present)
  console.log(parseInt(present.toFixed(0)))
  return (parseInt(present.toFixed(0)))
}
