import { useEffect, useState } from "react"
import { SecretInfoChartProps } from "./secret-info-chart"

const useSecretInfoChart = ({ secretInfos }: SecretInfoChartProps) => {
  const [labels, setLabels] = useState<string[]>()
  const [data, setData] = useState<number[]>()
  const [isDone, setIsDone] = useState(false)

  useEffect(() => {
    if (!secretInfos || secretInfos.length === 0) return;
    const dates = [...secretInfos].map(info => {
      const date = new Date(Number(info[8])*1000)
      return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    })
    const countedSecretInfos = dates.reduce((cnt: any, cur: any) => (cnt[cur] = cnt[cur] + 1 || 1, cnt), {});

    setLabels(Object.keys(countedSecretInfos).reverse())
    setData(Object.values(countedSecretInfos).reverse() as number[])
    setIsDone(true)
  }, [secretInfos])

  return {
    labels,
    datasets: [{
      label: 'Secret infos',
      data,
      backgroundColor: [
        'rgb(163 230 53)',
      ],
      borderColor: [
        'rgb(163 230 53)',
      ],
      borderWidth: 2
    }],
    isDone
  }
}

export default useSecretInfoChart