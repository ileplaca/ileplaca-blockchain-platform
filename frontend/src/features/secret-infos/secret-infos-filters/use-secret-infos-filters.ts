import { useSelector } from "react-redux"
import { getSecretInfos } from "smart-contracts/passing-secret-info/slice";

const useSecretInfosFilters = () => {
  const secretInfos = useSelector(getSecretInfos);

  const getSecretInfosByAccount = (accountAddress: string) => {
    return
  }
}

export default useSecretInfosFilters