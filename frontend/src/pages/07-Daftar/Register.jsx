import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Container,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
  useBreakpointValue,
  useColorModeValue,
} from '@chakra-ui/react';
import { register } from '../../redux/reducer/registerReducer';
import { Toast } from '../../components/02-Reusable/Toast/Toast';
import { useCallback } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import {
  emailValidator,
  firstnameValidator,
  lastnameValidator,
  passwordValidator,
} from '../../utils/validasiRegex';

export default function Daftar() {
  const color = useColorModeValue('white', 'black');
  const bg = useColorModeValue('accentLight.400', 'accentDark.400');
  const hoverBg = useColorModeValue('accentLight.500', 'accentDark.500');
  const isLoading = useSelector((state) => state.register.isLoading);
  const [passwordType, setPasswordType] = useState(false);
  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
  const [formData, setFormData] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    nama_depan: '',
    nama_belakang: '',
    email: '',
    password: '',
    phone: '',
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = useCallback(
    (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    },
    [formData]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      nama_depan: firstnameValidator(formData.nama_depan),
      nama_belakang: lastnameValidator(formData.nama_belakang),
      email: emailValidator(formData.email),
      password: passwordRegex,
    });
    if (errors.nama_depan || errors.nama_belakang) {
      Toast.fire({
        icon: 'warning',
        title: 'Nama tidak boleh mengandung angka',
      });
    } else if (errors.email) {
      Toast.fire({
        icon: 'warning',
        title: 'Contoh email yang benar hokage@konoha.com',
      });
    } else if (formData.password != passwordRegex) {
      Toast.fire({
        icon: 'warning',
        title:
          'Password minimal 8 karakter dan mengandung minimal besar, kecil, angka, dan simbol',
      });
    } else {
      try {
        await dispatch(register(formData)).unwrap();
        navigate('/masuk', { replace: true });
        Toast.fire({
          icon: 'success',
          title: 'Berhasil mendaftar',
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: 'error',
          title: 'Gagal mendaftar',
        });
      }
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <Container
          data-aos="flip-down"
          maxW="lg"
          py={{
            base: '12',
            md: '8',
          }}
          px={{
            base: '0',
            sm: '8',
          }}
        >
          <Stack
            spacing={8}
            backgroundColor={useColorModeValue('#F5FFFA', '#696969')}
          >
            <Stack spacing={6}>
              <img
                src={`${process.env.PUBLIC_URL + `/image/logo.svg`}`}
                alt="logo"
                style={{
                  height: '20',
                  width: '20',
                  display: 'block',
                  margin: 'auto',
                }}
              />
              <Stack
                spacing={{
                  base: '2',
                  md: '3',
                }}
                textAlign="center"
              >
                <Heading
                  size={useBreakpointValue({
                    base: 'xs',
                    md: 'sm',
                  })}
                >
                  Daftar Akun Baru
                </Heading>
              </Stack>
            </Stack>
            <Box
              py={{
                base: '0',
                sm: '8',
              }}
              px={{
                base: '4',
                sm: '10',
              }}
              bg={useBreakpointValue({
                base: 'transparent',
                sm: 'bg-surface',
              })}
              boxShadow={{
                base: 'none',
                sm: useColorModeValue('md', 'md-dark'),
              }}
              borderRadius={{
                base: 'none',
                sm: 'xl',
              }}
            >
              <Stack spacing={6}>
                <Stack spacing={5}>
                  <HStack>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Nama Depan</FormLabel>
                        <Input
                          type="text"
                          id="nama_depan"
                          name="nama_depan"
                          value={formData.nama_depan}
                          onChange={handleInputChange}
                          focusBorderColor={bg}
                        />
                      </FormControl>
                    </Box>
                    <Box>
                      <FormControl isRequired>
                        <FormLabel>Nama Belakang</FormLabel>
                        <Input
                          type="text"
                          id="nama_belakang"
                          name="nama_belakang"
                          value={formData.nama_belakang}
                          onChange={handleInputChange}
                          focusBorderColor={bg}
                        />
                      </FormControl>
                    </Box>
                  </HStack>
                  <FormControl isRequired>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      autoComplete="email"
                      focusBorderColor={bg}
                      required
                    />
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Kata Sandi</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input
                        type={passwordType ? 'text' : 'password'}
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        focusBorderColor={bg}
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          icon={passwordType ? <ViewIcon /> : <ViewOffIcon />}
                          onClick={() => setPasswordType(!passwordType)}
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                  <FormControl isRequired>
                    <FormLabel>Ulangi Kata Sandi</FormLabel>
                    <InputGroup size={'lg'}>
                      <Input
                        type={passwordType ? 'text' : 'password'}
                        name="konfirmasiPassword"
                        id="konfirmasiPassword"
                        value={formData.konfirmasiPassword}
                        onChange={handleInputChange}
                        focusBorderColor={bg}
                      />
                      <InputRightElement width="4.5rem">
                        <IconButton
                          icon={passwordType ? <ViewIcon /> : <ViewOffIcon />}
                          onClick={() => setPasswordType(!passwordType)}
                          variant="ghost"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>
                </Stack>
                <Stack spacing={6}>
                  {isLoading ? (
                    <Button type="submit" disabled>
                      Loading...
                    </Button>
                  ) : (
                    <Button
                      type="submit"
                      color={color}
                      bg={bg}
                      _hover={hoverBg}
                      size={'lg'}
                      fontSize={'md'}
                      w="full"
                    >
                      Daftar
                    </Button>
                  )}

                  <Text textAlign={'center'}>
                    Sudah punya akun?{' '}
                    <Link color={bg} to="/masuk">
                      Masuk
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Container>
      </form>
    </Container>
  );
}
