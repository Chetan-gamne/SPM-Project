import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Input from "../UI/Input";
import { useLanguage } from "../../hooks/useLanguage";
import { IUser } from "../../lib/types/user";
import { ImSpinner2 } from "react-icons/im";
import ClipLoader from "react-spinners/ClipLoader";

interface Props {
  title: string;
  submitHandler: (user: IUser) => void;
  errorMessage: string;
}
const EnteringBox: React.FC<Props> = ({
  title,
  submitHandler,
  errorMessage,
}) => {
  const userNameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const errorMessageRef = useRef<HTMLSpanElement | null>(null);
  const { t } = useLanguage();
  const [loader, setLoader] = useState(false);

  if (errorMessage) {
    title === "signUp" ? userNameRef.current?.focus() : null;
    emailRef.current?.focus();
    passwordRef.current?.focus();
  }

  async function onSubmitHandler(e: React.FormEvent) {
    setLoader(true);
    e.preventDefault();
    if (passwordRef.current?.value && emailRef.current?.value) {
      let user: IUser | null = null;
      if (userNameRef.current?.value && title === "signUp") {
        user = {
          name: userNameRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          phone: "+91" + phoneRef.current?.value,
          // isAdmin: false,
        };
      } else {
        user = {
          password: passwordRef.current?.value,
          email: emailRef.current?.value,
        };
      }
      await submitHandler(user);
      setLoader(false);
      // userNameRef.current.changeValue('');
      // passwordRef.current.changeValue('');
      // emailRef.current.changeValue('');
    }
  }
  const linkHref = title === "login" ? "signUp" : "login";

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <div className="w-full md:w-[50%] max-w-[500px] border-2 bg-palette-card shadow-lg py-4 px-8 rounded-lg">
        <h2 className="text-lg md:text-2xl font-bold">{t[`${title}`]}</h2>
        <p className="mt-4 mb-2">
          {t.hi}
          {title === "login" ? (
            <>
              <br />
              <span className="inline-block text-palette-mute dark:text-palette-base/80 text-[12px] mt-2 bg-palette-fill p-2">
                {t.loginExplanation}
              </span>
            </>
          ) : null}
        </p>
        <form onSubmit={onSubmitHandler}>
          <div className="mt-8">
            {title === "signUp" ? (
              <Input
                ref={userNameRef}
                type="text"
                id="userName"
                placeholder="enterYourUserName"
                required={true}
              />
            ) : null}
            <Input
              ref={emailRef}
              type="email"
              id="email"
              placeholder="enterYourEmail"
              required={true}
              title={title === "login" ? "test@info.co" : undefined}
            />
            <Input
              ref={passwordRef}
              type="password"
              id="password"
              placeholder="enterYourPassword"
              title={title === "login" ? "123456" : undefined}
              required={true}
            />

            {title === "signUp" ? (
              <div className="flex items-center justify-center">
                <label className="flex-[0.1]">+91</label>
                <div className="flex-1">
                  <Input
                    ref={phoneRef}
                    type="text"
                    maxLength={10}
                    id="phone"
                    placeholder="enterYourPhoneNumber"
                    required={true}
                  />
                </div>
              </div>
            ) : null}
          </div>
          {errorMessage && (
            <span
              ref={errorMessageRef}
              className="text-rose-600 block -mt-4 mb-4"
            >
              {t[`${errorMessage}`] ? t[`${errorMessage}`] : errorMessage}
            </span>
          )}

          <button
            type="submit"
            className={`bg-palette-primary w-full py-4 rounded-lg text-palette-side
             text-xl shadow-lg flex justify-center`}
          >
            {loader ? (
              <ClipLoader
                color={"white"}
                loading={loader}
                size={30}
                aria-label="Loading Spinner"
                data-testid="loader"
              />
            ) : (
              t[`${title}`]
            )}
          </button>
        </form>
        <Link href={`/${linkHref}`}>
          <a className="block my-4">
            <span className="text-sm text-palette-mute">
              {title === "login" ? t.doHaveAnAccount : t.alreadyHaveAnAccount}
            </span>
            <span className="text-cyan-500">{t[`${linkHref}`]}</span>
          </a>
        </Link>
        {title == "login" && (
          <Link href={`/forgotPassword`}>
            <a className="block my-4">
              <span className="text-sm text-palette-mute ">
                Forgot Password?
              </span>
            </a>
          </Link>
        )}
      </div>
    </div>
  );
};

export default EnteringBox;
