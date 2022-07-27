import { LoginForm,
         PageTitle } from "components";

const LoginAuthForm = () => {
  return (
    <>
      <section className="px-4 py-8">
        <div className="container mx-auto">
        <PageTitle
          title="Acesse sua conta"
          subtitle="E junte-se a uma comunidade de pessoas apaixonadas por livros.​"
          className="text-center mb-8" />
        </div>
        <LoginForm />
      </section>
    </>
  );
}

export default LoginAuthForm;
