import React from 'react';
import { ScrollView } from 'react-native';
import { useTheme } from '@emotion/react';
import { TextInputMask } from 'react-native-masked-text';
import PageTitle from 'ui/components/data-display/PageTitle/PageTitle';
import TextInput from 'ui/components/inputs/TextInput/TextInput';
import Button from 'ui/components/inputs/Button/Button';
import UserInformation from 'ui/components/data-display/UserInformation/UserInformation';
import {
  FormContainer,
  TextContainer,
  ErrorText,
  ResponseContainer,
} from '@styles/pages/SearchProfessional.style';
FormContainer;
import useIndex from 'data/hooks/pages/useIndex.page';
import useSearchProfessional from 'data/hooks/pages/useSearchProfessional.page.mobile';
import { useEffect } from 'react';

const SearchProfessional: React.FC = () => {
  const { colors } = useTheme();
  const {
    cep,
    setCep,
    cepValidation,
    searchProfessionals,
    warning,
    professionals,
    search,
    loading,
    otherProfessionals,
  } = useIndex();

  const { autoCep } = useSearchProfessional();

  useEffect(() => {
    if (autoCep) {
      setCep(autoCep);
      searchProfessionals(autoCep);
    }
  }, [autoCep]);
  return (
    <ScrollView>
      <PageTitle
        title={'Conheça nossos profissionais '}
        subtitle={
          'Preencha seu endereço e veja todos os profissionais da sua região'
        }
      />
      <FormContainer>
        <TextInputMask
          value={cep}
          onChangeText={setCep}
          type={'custom'}
          options={{
            mask: '99.999-999',
          }}
          customTextInput={TextInput}
          customTextInputProps={{
            label: 'Digite seu CEP',
          }}
        />
        {warning ? <ErrorText>{warning}</ErrorText> : null}
        <Button
          mode={'contained'}
          style={{ marginTop: 32 }}
          color={colors.accent}
          disabled={!cepValidation || loading}
          onPress={() => searchProfessionals(cep)}
          loading={loading}
        >
          Buscar
        </Button>
      </FormContainer>

      {search &&
        (professionals.length > 0 ? (
          <ResponseContainer>
            {professionals.map((item, index) => {
              return (
                <UserInformation
                  key={index}
                  name={item.nome_completo}
                  rating={item.reputacao || 0}
                  picture={item.foto_usuario || ''}
                  description={item.cidade}
                  darker={index % 2 === 1}
                />
              );
            })}

            {otherProfessionals > 0 && (
              <TextContainer>
                ...E mais {otherProfessionals}{' '}
                {otherProfessionals > 1
                  ? ' profissionais atendem '
                  : ' profissional atende '}{' '}
                ao seu endereço.
              </TextContainer>
            )}
          </ResponseContainer>
        ) : (
          <TextContainer>
            Ainda não temos nenhuma diarista disponível em sua
            região.
          </TextContainer>
        ))}
    </ScrollView>
  );
};

export default SearchProfessional;
