function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSignUp = async () => {
      try {
        await auth.createUserWithEmailAndPassword(email, password);
        console.log('User signed up successfully!');
      } catch (error) {
        console.error('Error signing up:', error.message);
      }
    };
}