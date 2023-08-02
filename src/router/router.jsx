import { createBrowserRouter,redirect } from "react-router-dom"
import { Index,Main,SignIn,Register,MangaForm,AuthorForm,CompanyForm,ChapterForm,Allow,AuthorProfile } from "./index"
import info from "../utils/info"

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main />,
        children: [
            { path: '/', element: <Index /> },
            { path: '/index', element: <Index /> },
            { path: '/home', element: <Index /> },
            { path: '/signin', element: <SignIn />, loader: async()=> info().online && redirect("/")},
            { path: '/register', element: <Register />, loader: async()=> info().online && redirect("/")},
            { path: '/manga-form', element: <MangaForm />, loader: async()=> (info().role===0 || info().role===3) && redirect("/bad-auth")},
            { path: '/author-form', element: <AuthorForm />, loader: async()=> (info().role===1 || info().role===2) && redirect("/bad-auth")},
            { path: '/cia-form', element: <CompanyForm />, loader: async()=> (info().role===1 || info().role===2) && redirect("/bad-auth")},
            { path: '/:manga_id/chapter-form', element: <ChapterForm />, loader: async()=> (info().role===0 || info().role===3) && redirect("/bad-auth")},
            { path: '/me', element: <AuthorProfile />, loader: async()=> (info().role===0 || info().role===2 || info().role===3) && redirect("/bad-auth")},
            { path: '/*', element: <Allow />}
        ]
    }
])

export default router