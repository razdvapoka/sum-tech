import { createBreakpoint } from 'react-use'

import { MOBILE_BP, TABLET_BP } from '../utils/consts'

const useBreakpoint = createBreakpoint({
  TABLET: TABLET_BP,
  MOBILE: MOBILE_BP,
})

export default useBreakpoint
