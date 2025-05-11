// "use client"

// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
// import { Check, ChevronDown, Globe } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
// import { useToast } from "@/hooks/use-toast"

// interface Language {
//   code: string
//   name: string
//   native_name: string
//   flag_icon: string
// }

// export function LanguageSwitcher() {
//   const router = useRouter()
//   const { toast } = useToast()
//   const supabase = createClientComponentClient()
//   const [languages, setLanguages] = useState<Language[]>([])
//   const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchLanguages() {
//       try {
//         // Get all available languages
//         const { data: languagesData, error: languagesError } = await supabase
//           .from("languages")
//           .select("*")
//           .eq("is_active", true)
//           .order("name")

//         if (languagesError) throw languagesError

//         // Get user's preferred language if logged in
//         const {
//           data: { session },
//         } = await supabase.auth.getSession()

//         if (session?.user) {
//           const { data: profile } = await supabase
//             .from("profiles")
//             .select("preferred_language")
//             .eq("id", session.user.id)
//             .single()

//           if (profile?.preferred_language) {
//             const userLanguage = languagesData.find((lang) => lang.code === profile.preferred_language)
//             if (userLanguage) {
//               setCurrentLanguage(userLanguage)
//             }
//           }
//         }

//         // If no user language is set, use browser language or default to English
//         if (!currentLanguage) {
//           const browserLang = navigator.language.split("-")[0]
//           const matchedLang = languagesData.find((lang) => lang.code === browserLang)
//           setCurrentLanguage(matchedLang || languagesData.find((lang) => lang.code === "en") || languagesData[0])
//         }

//         setLanguages(languagesData)
//       } catch (error) {
//         console.error("Error fetching languages:", error)
//         toast({
//           title: "Error",
//           description: "Failed to load language options",
//           variant: "destructive",
//         })
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchLanguages()
//   }, [supabase, toast])

//   const changeLanguage = async (language: Language) => {
//     setCurrentLanguage(language)

//     try {
//       // Update user preference if logged in
//       const {
//         data: { session },
//       } = await supabase.auth.getSession()

//       if (session?.user) {
//         const { error } = await supabase.rpc("update_user_language", {
//           lang_code: language.code,
//         })

//         if (error) throw error
//       }

//       // Store in localStorage for non-logged in users
//       localStorage.setItem("preferredLanguage", language.code)

//       // Refresh the page to apply language changes
//       router.refresh()

//       toast({
//         title: "Language updated",
//         description: `Language changed to ${language.name}`,
//       })
//     } catch (error) {
//       console.error("Error changing language:", error)
//       toast({
//         title: "Error",
//         description: "Failed to update language preference",
//         variant: "destructive",
//       })
//     }
//   }

//   if (loading) {
//     return (
//       <Button variant="ghost" size="sm" disabled>
//         <Globe className="h-4 w-4 mr-2" />
//         <span>Loading...</span>
//       </Button>
//     )
//   }

//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant="ghost" size="sm" className="flex items-center gap-1">
//           <span className="mr-1">{currentLanguage?.flag_icon}</span>
//           <span className="hidden md:inline">{currentLanguage?.native_name}</span>
//           <ChevronDown className="h-4 w-4 opacity-50" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         {languages.map((language) => (
//           <DropdownMenuItem
//             key={language.code}
//             onClick={() => changeLanguage(language)}
//             className="flex items-center justify-between"
//           >
//             <div className="flex items-center">
//               <span className="mr-2">{language.flag_icon}</span>
//               <span>{language.native_name}</span>
//               <span className="ml-2 text-muted-foreground">({language.name})</span>
//             </div>
//             {currentLanguage?.code === language.code && <Check className="h-4 w-4 ml-2" />}
//           </DropdownMenuItem>
//         ))}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   )
// }

"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClientSupabaseClient } from "@/lib/supabase/client"
//import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { Check, ChevronDown, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"

interface Language {
  code: string
  name: string
  native_name: string
  flag_icon: string
}

export function LanguageSwitcher() {
  const router = useRouter()
  const { toast } = useToast()
  const supabase = createClientSupabaseClient()
  const [languages, setLanguages] = useState<Language[]>([])
  const [currentLanguage, setCurrentLanguage] = useState<Language | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchLanguages() {
      try {
        // Get all available languages
        const { data: languagesData, error: languagesError } = await supabase
          .from("languages")
          .select("*")
          .eq("is_active", true)
          .order("name")

        if (languagesError) throw languagesError

        // Get user's preferred language if logged in
        const {
          data: { session },
        } = await supabase.auth.getSession()

        if (session?.user) {
          const { data: profile } = await supabase
            .from("profiles")
            .select("preferred_language")
            .eq("id", session.user.id)
            .single()

          if (profile?.preferred_language) {
            const userLanguage = languagesData.find((lang: Language) => lang.code === profile.preferred_language)
            if (userLanguage) {
              setCurrentLanguage(userLanguage)
            }
          }
        }

        // If no user language is set, use browser language or default to English
        if (!currentLanguage) {
          const browserLang = navigator.language.split("-")[0]
          const matchedLang = languagesData.find((lang: Language) => lang.code === browserLang)
          setCurrentLanguage(matchedLang || languagesData.find((lang: Language) => lang.code === "en") || languagesData[0])
        }

        setLanguages(languagesData)
      } catch (error) {
        console.error("Error fetching languages:", error)
        toast({
          title: "Error",
          description: "Failed to load language options",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    fetchLanguages()
  }, [supabase, toast])

  const changeLanguage = async (language: Language) => {
    setCurrentLanguage(language)

    try {
      // Update user preference if logged in
      const {
        data: { session },
      } = await supabase.auth.getSession()

      if (session?.user) {
        const { error } = await supabase.rpc("update_user_language", {
          lang_code: language.code,
        })

        if (error) throw error
      }

      // Store in localStorage for non-logged in users
      localStorage.setItem("preferredLanguage", language.code)

      // Refresh the page to apply language changes
      router.refresh()

      toast({
        title: "Language updated",
        description: `Language changed to ${language.name}`,
      })
    } catch (error) {
      console.error("Error changing language:", error)
      toast({
        title: "Error",
        description: "Failed to update language preference",
        variant: "destructive",
      })
    }
  }

  if (loading) {
    return (
      <Button variant="ghost" size="sm" disabled>
        <Globe className="h-4 w-4 mr-2" />
        <span>Loading...</span>
      </Button>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="flex items-center gap-1">
          <span className="mr-1">{currentLanguage?.flag_icon}</span>
          <span className="hidden md:inline">{currentLanguage?.native_name}</span>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((language) => (
          <DropdownMenuItem
            key={language.code}
            onClick={() => changeLanguage(language)}
            className="flex items-center justify-between"
          >
            <div className="flex items-center">
              <span className="mr-2">{language.flag_icon}</span>
              <span>{language.native_name}</span>
              <span className="ml-2 text-muted-foreground">({language.name})</span>
            </div>
            {currentLanguage?.code === language.code && <Check className="h-4 w-4 ml-2" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}