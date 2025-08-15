import { Button } from "@patternfly/react-core";
import { StarIcon, SomeIcon } from "@patternfly/react-icons";

export const ButtonSupportFavoriteVariantInput = () => (
  <>
    {/* Simple case - warning only */}
    <Button>
      <StarIcon />
    </Button>

    {/* StarIcon in icon prop - warning only */}
    <Button icon={<StarIcon />} />

    {/* StarIcon with existing props - warning only */}
    <Button variant="primary">
      <StarIcon />
    </Button>

    {/* StarIcon with text - warning only */}
    <Button>
      Favorite <StarIcon />
    </Button>

    {/* StarIcon with other icon - warning only */}
    <Button>
      <SomeIcon />
      <StarIcon />
    </Button>

    {/* StarIcon in fragment - warning only */}
    <Button>
      <>Favorite <StarIcon /></>
    </Button>

    {/* Already using new props - no warning */}
    <Button isFavorite={true} />
    <Button isFavorited={true} />
  </>
);
