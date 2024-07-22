import { Text, View, Permission, TouchableOpacity } from "react-native";
import styles from "../styles/home";
import { Image } from "react-native";
import { useState, useRef } from "react";
import { FontAwesome5 } from "@expo/vector-icons";

//icons
import MikeIcon from "../../assets/icons/mike.png";
import CameraIcon from "../../assets/icons/camera.png";
import VideoIcon from "../../assets/icons/video.png";

// camera stuff
import { Camera, CameraType } from "expo-camera";
import * as MediaLibrary from "expo-media-library";
import { Audio } from "expo-av";

// Audio recording
const recordingOptions = {
  android: {
    extension: ".wav",
    outputFormat: Audio.RECORDING_OPTION_ANDROID_OUTPUT_FORMAT_MPEG_4,
    audioEncoder: Audio.RECORDING_OPTION_ANDROID_AUDIO_ENCODER_AAC,
    sampleRate: 44100,
    numberOfChannels: 2,
    bitRate: 128000,
  },
  ios: {
    extension: ".caf",
    audioQuality: Audio.RECORDING_OPTION_IOS_AUDIO_QUALITY_HIGH,
    sampleRate: 44100,
    numberOfChannels: 1,
    bitRate: 128000,
    linearPCMBitDepth: 16,
    linearPCMIsBigEndian: false,
    linearPCMIsFloat: false,
  },
};

export default function QuickAccess({
  i18n,
  cameraState: [isTakingPhoto, setIsTakingPhoto],
  showMessage,
}) {
  // set the camera type to back by default
  const [type, setType] = useState(Camera.Constants.Type.back);

  // video recording state
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef(null); // create a ref for the camera component

  const [audioRecording, setAudioRecording] = useState(null); // audio recording
  const [timer, setTimer] = useState(0);
  const [timerInterval, setTimerInterval] = useState(null);
  const [hasPermission, setHasPermission] = useState(null); // camera permission

  const toggleCameraType = () => {
    setType((current) =>
      current === Camera.Constants.Type.back
        ? Camera.Constants.Type.front
        : Camera.Constants.Type.back
    );
  };

  const requestCameraPermission = async (type) => {
    try {
      const reqStatus =
        type === "audio"
          ? await Audio.requestPermissionsAsync()
          : await Camera.requestCameraPermissionsAsync();

      setHasPermission(reqStatus.status === "granted");

      type === "video" && (await Camera.requestMicrophonePermissionsAsync());

      if (reqStatus.status !== "granted") {
        alert("You need to enable permission to access the library.");
      }

      if (reqStatus.status === "granted") {
        MediaLibrary.requestPermissionsAsync();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const takePicture = async () => {
    await requestCameraPermission("image");
    if (hasPermission) {
      if (cameraRef) {
        setIsTakingPhoto("image");
        try {
          const data = await cameraRef.current.takePictureAsync();

          await saveMedia(`${data.uri}`);
          setIsTakingPhoto(null);

          showMessage({
            type: "success",
            message: i18n.t("home.pictureSaved"),
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      await requestCameraPermission("image");
    }
  };

  const saveMedia = async (media) => {
    try {
      const asset = await MediaLibrary.createAssetAsync(media);
      await MediaLibrary.createAlbumAsync("Surakhsya", asset, false);
    } catch (error) {
      console.log(error);
    }
  };

  const startVideo = async () => {
    await requestCameraPermission("video");
    if (hasPermission) {
      if (cameraRef) {
        setIsTakingPhoto("video");
        try {
          const data = await cameraRef.current.recordAsync();

          await saveMedia(`${data.uri}`);
          setIsTakingPhoto(null);

          showMessage({
            type: "success",
            message: i18n.t("home.videoSaved"),
          });
        } catch (error) {
          console.log(error);
        }
      }
    } else {
      await requestCameraPermission("video");
    }
  };

  // audio recording

  const startRecording = async () => {
    try {
      await requestCameraPermission("audio");
      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(recordingOptions);
      await recording.startAsync();
      setAudioRecording(recording);

      // Start the timer
      const intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
      setTimerInterval(intervalId);
    } catch (error) {
      console.log(error);
    }
  };

  const stopRecording = async () => {
    try {
      await audioRecording.stopAndUnloadAsync();
      const uri = audioRecording.getURI();
      console.log(uri);
      await saveMedia(uri);
      clearInterval(timerInterval);
      setTimer(0);
      setAudioRecording(null);
      showMessage({
        type: "success",
        message: i18n.t("home.audioSaved"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatTime = (timeInSeconds) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;

    const formatDigit = (digit) => {
      const digitTranslation = i18n.t("home.numberFormat." + digit);
      return digitTranslation !== undefined ? digitTranslation : digit;
    };

    const formattedMinutes = String(minutes)
      .padStart(2, "0")
      .split("")
      .map(formatDigit)
      .join("");
    const formattedSeconds = String(seconds)
      .padStart(2, "0")
      .split("")
      .map(formatDigit)
      .join("");

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <>
      {isTakingPhoto ? (
        <>
          {/* Close button */}
          <TouchableOpacity
            onPress={() => {
              setIsTakingPhoto(null);
            }}
            style={styles.closeButton}
          >
            <FontAwesome5 name="times" size={28} color="#fff" />
          </TouchableOpacity>

          {/* Camera */}
          <Camera
            ref={cameraRef}
            style={styles.camera}
            type={type}
            ratio="16:9"
            useCamera2Api={true}
          />

          {/* save button */}
          {isTakingPhoto === "video" ? (
            <TouchableOpacity
              onPress={() => {
                recording ? cameraRef.current.stopRecording() : startVideo();
                setRecording(!recording);
              }}
              style={styles.saveButton}
            >
              <FontAwesome5
                name={recording ? "stop" : "video"}
                size={25}
                color="#fff"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={takePicture} style={styles.saveButton}>
              <FontAwesome5 name="camera" size={25} color="#fff" />
            </TouchableOpacity>
          )}
        </>
      ) : (
        <View style={styles.quickAccessContainer}>
          <Text style={styles.quickAccessTitle}>
            {i18n.t("home.quick_access")}
          </Text>
          <View
            style={[
              styles.quickAccessButtonsContainer,
              {
                backgroundColor: audioRecording ? "#fff" : "#8D64FF11",
                justifyContent: audioRecording ? "center" : "space-evenly",
              },
            ]}
          >
            <TouchableOpacity
              onPress={audioRecording ? stopRecording : startRecording}
              style={styles.quickAccessButton}
            >
              {audioRecording ? (
                <FontAwesome5 name="stop" size={25} color="red" />
              ) : (
                <Image source={MikeIcon} style={styles.quickAccessButtonIcon} />
              )}
            </TouchableOpacity>

            {audioRecording ? (
              // timer
              <Text style={styles.timer}>{formatTime(timer)}</Text>
            ) : (
              <>
                <TouchableOpacity
                  onPress={() => setIsTakingPhoto("image")}
                  style={styles.quickAccessButton}
                >
                  <Image
                    source={CameraIcon}
                    style={styles.quickAccessButtonIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setIsTakingPhoto("video")}
                  style={styles.quickAccessButton}
                >
                  <Image
                    source={VideoIcon}
                    style={styles.quickAccessButtonIcon}
                  />
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      )}
    </>
  );
}
