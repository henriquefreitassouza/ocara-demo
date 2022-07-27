import { Routes, Route } from "react-router-dom";
import { About,
         BookCategory,
         BookCategoryList,
         BookCreate,
         BookEdit,
         BookExcerpt,
         BookGateway,
         Community,
         CommunityCreate,
         CommunityEvent,
         CommunityEventCreate,
         CommunityEventList,
         CommunityGateway,
         CommunityList,
         Home,
         Login,
         Logout,
         NotFound,
         PrivacyPolicy,
         Profile,
         ProfileComplete,
         ProfileGateway,
         ProfileEdit,
         Template,
         TermsOfService } from "routes";

const Router = () => {
  return (
    <>
      <Routes>
        <Route element={<Template />}>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<BookCategoryList />} />
          <Route path="/clubes-de-leitura" element={<CommunityList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/politica-de-privacidade" element={<PrivacyPolicy />} />
          <Route path="/sobre-a-ocara" element={<About />} />
          <Route path="/termos-de-uso" element={<TermsOfService />} />

          <Route path="/categorias" element={<BookGateway />}>
            <Route path="/categorias/:category" element={<BookCategory />} />
            <Route path="/categorias/:category/:book" element={<BookExcerpt />} />
          </Route>

          <Route path="/clubes-de-leitura" element={<CommunityGateway />}>
            <Route path="/clubes-de-leitura/:community" element={<Community />} />
            <Route path="/clubes-de-leitura/:community/eventos" element={<CommunityEventList />} />
            <Route path="/clubes-de-leitura/:community/eventos/:event" element={<CommunityEvent />} />
          </Route>

          <Route path="/perfil" element={<ProfileGateway />}>
            <Route path="/perfil" element={<Profile />} />
            <Route path="/perfil/cadastro" element={<ProfileComplete />} />
            <Route path="/perfil/editar" element={<ProfileEdit />} />
            <Route path="/perfil/clubes-de-leitura/criar" element={<CommunityCreate />} />
            <Route path="/perfil/clubes-de-leitura/:community/eventos/criar" element={<CommunityEventCreate />} />
            <Route path="/perfil/resenhas/criar" element={<BookCreate />} />
            <Route path="/perfil/resenhas/:book/editar" element={<BookEdit />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}

export default Router;
