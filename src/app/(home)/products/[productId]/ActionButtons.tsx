'use client';

import { Box, Grid, Typography } from '@mui/material';
import { useSession } from 'next-auth/react';
import { enqueueSnackbar } from 'notistack';
import { useEffect, useState } from 'react';

import BaseButton from '@/components/ui/BaseButton';
import { IActionButtonsProps } from '@/lib/types/props.type';
import { actionButtonsStyles as styles } from '@/styles/product/product.style';
import { addToCartQuery } from '@/tools';
import { addLastViewedProductId } from '@/utils';

export default function ActionButtons({
  sizes,
  product,
  id,
}: IActionButtonsProps) {
  const [selectedSize, setSelectedSize] = useState<number | undefined>();
  const { data: session, status: sessionStatus } = useSession();

  const onSelectSize = (value: number) => setSelectedSize(value);

  const addToBag = () => {
    addToCartQuery(product, session?.user?.id, selectedSize || 'unselected');
    enqueueSnackbar('Successfully added to cart', {
      variant: 'success',
      autoHideDuration: 2000,
    });
  };

  useEffect(() => {
    if (sessionStatus !== 'loading') {
      addLastViewedProductId(id, session?.user?.id);
    }
  }, [id, session?.user.id, sessionStatus]);

  return (
    <>
      {sizes && sizes.length !== 0 && (
        <Box sx={{ mt: '10px', w: '100%' }}>
          <Typography variant="h4" sx={styles.productLabel}>
            Select Size
          </Typography>
          <Grid
            data-testid="singleProductPage__sizeSelector"
            container
            spacing={2}
            sx={{ pt: '14px' }}
          >
            {sizes
              .sort((a, b) => +a.attributes.value - +b.attributes.value)
              .map(({ id, attributes: { value } }) => {
                const isChecked = +value === selectedSize;
                return (
                  <Grid key={id} xs={3} sm={2} item>
                    <BaseButton
                      data-testid={'singleProductPage__sizeButton__' + value}
                      sx={{
                        ...styles.sizeBtn,
                        color: isChecked ? 'white' : 'text.secondary',
                      }}
                      variant={isChecked ? 'contained' : 'outlined'}
                      onClick={() => onSelectSize(+value)}
                    >
                      EU-{value}
                    </BaseButton>
                  </Grid>
                );
              })}
          </Grid>
        </Box>
      )}
      <Box sx={styles.addButtons}>
        <BaseButton
          data-testid="singleProductPage__addToBagButton"
          onClick={addToBag}
          sx={styles.actionButton}
          disabled={sessionStatus === 'loading'}
        >
          {sessionStatus === 'loading' ? 'Wait...' : 'Add to Bag'}
        </BaseButton>
      </Box>
    </>
  );
}
