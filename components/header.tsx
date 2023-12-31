import { VStack, Box, GridItem, Image } from "@chakra-ui/react"
import Link from "next/link"
import { GlobalHeader } from "../tina/__generated__/types"
import { tinaField } from "tinacms/dist/react"

import { Logo, MotionGrid, MotionFlex } from "../components"
import { useOnboarding } from "../contexts/onboarding"

const Header = ({ data }: { data: GlobalHeader }) => {
  const { pageTransitionDuration } = useOnboarding()

  return (
    <MotionGrid
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, delay: pageTransitionDuration + 2 }}
      gridTemplateColumns="50% 1fr 1fr 1fr"
      alignItems="start"
      className="header"
    >
      <Logo />
      {data.nav &&
        data.nav.map((item, i) => {
          if (!item) {
            return null
          }

          return (
            <Box
              key={`${item.label}-${i}`}
              display={{ base: "none", md: "block" }}
            >
              <VStack alignItems="left" spacing={2}>
                <Link
                  data-tina-field={tinaField(item, "label")}
                  href={`/${item.href}`}
                >
                  {item.label}
                </Link>
                {item.subnav &&
                  item.subnav.map((subItem, i) => {
                    if (!subItem) {
                      return null
                    }
                    return (
                      <Link
                        key={`${subItem.label}-${i}`}
                        data-tina-field={tinaField(subItem, "label")}
                        href={`/${subItem.href}`}
                      >
                        {subItem.label}
                      </Link>
                    )
                  })}
              </VStack>
            </Box>
          )
        })}

      <GridItem colStart={{ base: 3, md: -1 }} marginTop={{ base: 20, md: 0 }}>
        <MotionFlex
          justifyContent="center"
          alignItems="center"
          width={{ base: 20, mid: 32 }}
          height={{ base: 20, mid: 32 }}
          maxWidth={32}
          maxHeight={32}
          minWidth={20}
          minHeight={20}
          initial={{ rotate: 0 }}
          animate={{ rotate: 360 }}
          transition={{ ease: "linear", duration: 10, repeat: Infinity }}
        >
          <Image
            src="/next.svg"
            htmlWidth="100%"
            htmlHeight="100%"
            alt="Vercel"
          />
        </MotionFlex>
      </GridItem>
    </MotionGrid>
  )
}

export default Header
