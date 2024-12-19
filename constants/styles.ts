import { StyleSheet } from "react-native";
import { APP_COLORS } from "./colors";

const jakartaFonts = StyleSheet.create({
    jakartaRegular: {
        fontFamily: 'PlusJakartaSansRegular',
    },
    jakartaMedium: {
        fontFamily: 'PlusJakartaSansMedium',
    },
    jakartaSemibold: {
        fontFamily: 'PlusJakartaSansSemiBold',
    },
    jakartaBold: {
        fontFamily: 'PlusJakartaSansBold',
    },
    jakartaExtra: {
        fontFamily: 'PlusJakartaSansExtraBold',
    },
});

const urbanistFonts = StyleSheet.create({
    urbanistRegular: {
        fontFamily: 'UrbanistRegular',
    },
    urbanistMedium: {
        fontFamily: 'UrbanistMedium',
    },
    urbanistSemibold: {
        fontFamily: 'UrbanistSemiBold',
    },
    urbanistBold: {
        fontFamily: 'UrbanistBold',
    },
    urbanistExtra: {
        fontFamily: 'UrbanistExtraBold',
    },
});

const styles = StyleSheet.create({
    ...jakartaFonts,
    ...urbanistFonts,
    shadow: {
		shadowColor: APP_COLORS.SHADOW,
		shadowOffset: {
			width: 0,
			height: 6,
		},
		shadowOpacity: 0.37,
		shadowRadius: 20.49,
		elevation: 12,
	},
});

export default styles;