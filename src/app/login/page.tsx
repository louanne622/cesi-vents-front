import LoginForm from '../components/LoginForm';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <div className="login-page bg-white">
      <div className="absolute inset-0 flex items-center justify-center md:ml-50">
        <div className="w-full max-w-md px-4 -mt-16">
          <div className="flex justify-center mb-8">
            <Image
              src="/img/cesi4.png"
              alt="CESI Logo"
              width={150}
              height={150}
              className="object-contain"
              priority
            />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
} 