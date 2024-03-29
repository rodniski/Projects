SELECT SB2.B2_FILIAL AS FILIAL,SB2.B2_LOCAL AS ARMAZEM, NNR_DESCRI AS CATEGORIA, SB2.B2_COD AS CODIGO, SB1.B1_DESC AS DESCRICAO, SALDO = ROUND((SB2.B2_QATU - SB2.B2_RESERVA - SB2.B2_QEMP - SB2.B2_QACLASS - SB2.B2_QEMPSA - SB2.B2_QEMPPRJ -  SB2.B2_QTNP +  SB2.B2_QNPT -  SB2.B2_QEMPPRE),2), 
'VALOR' = ROUND(SB1.B1_PRV1,2), B1_IPI 'PERC IPI', case when B1_IPI = '0' then '0' else ROUND(ROUND(SB1.B1_PRV1,2)*(B1_IPI/100)+ROUND(SB1.B1_PRV1,2),2) end as 'VALOR COM IPI',        
case when B1_GRUPO in ('0101','0103') then '0' else ROUND(SB2.B2_CM1,2) end as 'CUSTO UNITARIO',
'MARGEM' = ROUND((SB1.B1_PRV1-SB2.B2_CM1)/NULLIF(SB2.B2_CM1,0)*100,2), BZ_LOCALI2 AS LOCALIZACAO, B1_ESPECIF AS TIPO
FROM SB2010 SB2 
INNER JOIN SB1010 SB1 ON SB2.B2_COD = SB1.B1_COD 
INNER JOIN NNR010 NNR ON  B2_LOCAL = NNR_CODIGO AND NNR.D_E_L_E_T_ <>'*' 
left JOIN SBZ010 SBZ ON BZ_COD = B1_COD AND BZ_FILIAL = SB2.B2_FILIAL 
WHERE SB2.D_E_L_E_T_ <> '*' AND SB1.D_E_L_E_T_ <> '*' 
